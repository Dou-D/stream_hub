import z from "zod";
import request from "@/utils/request";
import { verificationResponseSchema, registerSchema } from "@/features/auth/schema";

// 验证码请求只需要验证码字段
const verificationRequestSchema = registerSchema.pick({ email: true });
// 验证码请求响应
type verificationResponse = z.infer<typeof verificationResponseSchema>;
// 验证码请求输入类型
type VerificationInputs = z.infer<typeof verificationRequestSchema>;

export const verify = (data: VerificationInputs) => {
  return request.post<verificationResponse>("/user/send_verification_code", data);
};
