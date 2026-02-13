import z from "zod";

import type { LoginInputs } from "@/features/auth/components/LoginCard";
import request from "@/utils/request";

const loginResponseSchema = z.object({
  data: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
  }),
  message: z.string(),
  status: z.number(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const login = (data: LoginInputs) => {
  return request.post<LoginResponse>("/user/login", data);
};
