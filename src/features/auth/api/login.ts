import z from "zod";

import request from "@/utils/request";
import { authResponseSchema, loginSchema } from "@/features/auth/schema";

export type LoginResponse = z.infer<typeof authResponseSchema>;
type LoginInputs = z.infer<typeof loginSchema>;

export const login = (data: LoginInputs) => {
  return request.post<LoginResponse>("/user/login", data);
};
