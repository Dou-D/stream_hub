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
