import z from "zod";

export const authResponseSchema = z.object({
  data: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
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

export const loginSchema = z.object({
  email: z.email({ message: "请输入正确的邮箱格式" }),
  password: z.string().min(6, { message: "密码长度不能少于6位" }),
});
