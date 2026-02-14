import z from "zod";

import type { LoginInputs } from "@/features/auth/components/LoginCard";
import request from "@/utils/request";
import { authResponseSchema } from "@/features/auth/api";

export type LoginResponse = z.infer<typeof authResponseSchema>;

export const login = (data: LoginInputs) => {
  return request.post<LoginResponse>("/user/login", data);
};
