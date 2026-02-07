import request from "@/utils/request";
type SendVerifyCodeResponse = {
  message: string;
};

export const sendVerifyCode = async (email: string) => {
  return request.post<SendVerifyCodeResponse>("/user/send_verification_code", {
    email,
  });
};
