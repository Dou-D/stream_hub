import { useAuthStore } from "@/store/authStore";

export const useAuthGuard = () => {
  const { access_token, refresh_token } = useAuthStore();

  const isAuthenticated = !!(access_token && refresh_token);
  return {
    isAuthenticated,
  };
};
