import z from "zod";

export const authResponseSchema = z.object({
  data: z.object({
    access_token: z.string().nullable(),
    refresh_token: z.string().nullable(),
  }),
  message: z.string(),
  status: z.number(),
});

export const verificationResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: null,
});

export const registerSchema = z.object({
  email: z.email({ message: "请输入正确的邮箱格式" }),
  verification_code: z.string().length(6, { message: "验证码只能为6位数字" }),
  password: z.string().refine((val) => val.length === 6, { message: "密码长度不能少于6位" }),
});
// 登录和注册的请求参数结构相同，因此可以复用同一个 schema 去掉 verification_code 字段
export const loginSchema = registerSchema.omit({ verification_code: true });

export const refreshTokenSchema = z.object({
  refresh_token: z.string().nullable(),
});
