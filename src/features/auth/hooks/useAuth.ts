import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUIStore } from "@/store";
import { useAuthStore } from "@/store/authStore";
import { login, register, verify } from "@/features/auth/api";

export const useAuth = () => {
  const { setAuthModalState } = useUIStore();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      useAuthStore.getState().setTokens({
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
      });
      toast.success(res.message || "登录成功", {
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
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      toast.success(res.message || "注册成功", {
        position: "top-center",
      });
      useAuthStore.getState().setTokens({
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setAuthModalState(false);
    },
    onError: (err) => {
      console.log("err", err);
      toast.error(err.message, {
        position: "top-center",
      });
    },
  });
  const verifyMutation = useMutation({
    mutationFn: verify,
    onMutate: () => {},
    // 请求失败，取消倒计时 并显示错误信息
    onError: (err) => {
      toast.error(err.message, {
        position: "top-center",
      });
    },
  });
  return {
    loginMutation,
    registerMutation,
    verifyMutation,
  };
};
