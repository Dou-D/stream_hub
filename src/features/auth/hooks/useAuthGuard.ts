import { useAuthStore } from "@/store/authStore";

export const useAuthGuard = () => {
  const access_token = useAuthStore((state) => state.access_token);
  const refresh_token = useAuthStore((state) => state.refresh_token);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  const isAuthenticated = !!(access_token && refresh_token);
  return {
    isAuthenticated,
    hasHydrated,
  };
};
