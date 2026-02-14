import z from "zod";
import request from "@/utils/request";
import { authResponseSchema, registerSchema } from "@/features/auth/schema";

type RegisterResponse = z.infer<typeof authResponseSchema>;
type RegisterInputs = z.infer<typeof registerSchema>;

export const register = (data: RegisterInputs) => {
  return request.post<RegisterResponse>("/user/register", data);
};
