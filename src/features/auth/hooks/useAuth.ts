import { login } from "@/features/auth/api";
import { useUIStore } from "@/store";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAuth = () => {
  const { setAuthModalState } = useUIStore();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      // 后端内部的错误会返回200，因此需要在成功的回调中再判断一次
      if (res.status !== 200) {
        throw new Error(res.message);
      }
      useAuthStore.getState().setTokens({
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
      });
      toast.success("登录成功", {
        position: "top-center",
      });
      // 登录成功后刷新用户信息
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // 登录成功后关闭Modal
      setAuthModalState(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error(err.message, {
        position: "top-center",
      });
    },
  });
  return {
    loginMutation,
  };
};
