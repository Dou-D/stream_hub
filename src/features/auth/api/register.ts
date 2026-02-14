import z from "zod";
import { type RegisterInputs } from "@/features/auth/components/RegisterCard";
import request from "@/utils/request";
import { authResponseSchema } from "@/features/auth/api";

export type RegisterResponse = z.infer<typeof authResponseSchema>;

export const register = (data: RegisterInputs) => {
  return request.post<RegisterResponse>("/user/register", data);
};
