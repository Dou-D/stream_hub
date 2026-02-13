import { renderHook, waitFor } from "@testing-library/react";
import { useAuth } from "@/features/auth/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { login } from "@/features/auth/api";
import { toast } from "sonner";

vi.mock("@/features/auth/api", () => ({
  login: vi.fn(),
}));
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }, // 测试时关闭自动重试
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
describe("useAuth", () => {
  describe("render", () => {
    it("should render a success toast when login is successful", async () => {
      // Arrange
      vi.mocked(login).mockResolvedValue({
        status: 200,
        message: "登录成功",
        data: {
          access_token: "123456",
          refresh_token: "654321",
        },
      });
      // Act
      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });
      result.current.loginMutation.mutate({
        email: "testuser@example.com",
        password: "testpassword",
      });
      // Assert
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled();
      });
    });
    it("should render a error toast when login is successful but backend status is not 200", async () => {
      // Arrange
      vi.mocked(login).mockResolvedValue({
        status: 401,
        message: "用户名或密码错误",
        data: {
          access_token: "123456",
          refresh_token: "654321",
        },
      });
      // Act
      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });
      result.current.loginMutation.mutate({
        email: "testuser@example.com",
        password: "testpassword",
      });
      // Assert
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });
    });
  });
});
