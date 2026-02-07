import type { LoginInputs } from "@/components/LoginCard/LoginCard";
import request from "@/utils/request";

type LoginResponse = {
  token: string;
};

export const loginUser = (data: LoginInputs) => {
  return request.post<LoginResponse>("/user/login", data);
};
