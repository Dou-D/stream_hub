import { type RegisterInputs } from "@/components/LoginCard/RegisterCard";
import request from "@/utils/request";

type RegisterResponse = {
  token: string;
};

export const registerUser = (data: RegisterInputs) => {
  return request.post<RegisterResponse>("/user/register", data);
};
