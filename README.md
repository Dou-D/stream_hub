# stream_hub

## token管理

UI -> useAuth -> store(authStore.ts) -> localstorage

## CI

```javascript
"scripts": {
    // CI 用：必须加上 --deny-warnings，否则有警告也不会报错(红叉)
    "lint": "oxlint . --deny-warnings",

    // CI 用：必须加上 run，否则 CI 会卡死
    "test": "vitest run"
}
```

## react-form-hook

### trigger

触发已经定义的规则

### setError

可以自定义错误，例如发送请求后，该邮箱已经存在

## zod

从schema拿出对应的校验

```ts
const authResponseSchema = z.object({
  data: z.object({
    access_token: z.string().nullable(),
    refresh_token: z.string().nullable(),
  }),
  message: z.string(),
  status: z.number(),
});

const TokenSchema = authResponseSchema.shape.data;
```

`nullable`表示可以为null

从schema去掉不要的校验

```ts
export const registerSchema = z.object({
  email: z.email({ message: "请输入正确的邮箱格式" }),
  verification_code: z.string().length(6, { message: "验证码只能为6位数字" }),
  password: z.string().refine((val) => val.length === 6, { message: "密码长度不能少于6位" }),
});

export const loginSchema = registerSchema.omit({ verification_code: true });
```

## refresh token

使用全局状态`_hasHydrated`，当zustand加载完毕后，检查是否有token，如果没有再弹窗。避免用户已经登录，但是状态还未加载完成，导致弹窗闪烁

```ts
onRehydrateStorage: () => (state) => {
  state?.setHasHydrated(true);
};
```
