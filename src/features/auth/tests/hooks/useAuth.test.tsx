import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "sonner";
import { login, register } from "@/features/auth/api";
import { useAuth } from "@/features/auth/hooks";
import { useUIStore } from "@/store";
import { useAuthStore } from "@/store/authStore";

vi.mock("@/features/auth/api/login", () => ({
  login: vi.fn(),
}));

vi.mock("@/features/auth/api/register", () => ({
  register: vi.fn(),
}));

vi.mock("@/store", () => ({
  useUIStore: vi.fn(),
}));

vi.mock("@/store/authStore", () => ({
  useAuthStore: {
    getState: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const createWrapper = (queryClient: QueryClient) => {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe("useAuth", () => {
  const setAuthModalStateMock = vi.fn();
  const setTokensMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useUIStore).mockReturnValue({
      setAuthModalState: setAuthModalStateMock,
      isAuthOpen: true,
    });
    vi.mocked(useAuthStore.getState).mockReturnValue({
      user_profile: null,
      access_token: null,
      refresh_token: null,
      setHasHydrated: vi.fn(),
      logout: vi.fn(),
      setTokens: setTokensMock,
    });
  });

  it("should handle login success side effects", async () => {
    const queryClient = new QueryClient();
    const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");
    const wrapper = createWrapper(queryClient);

    vi.mocked(login).mockResolvedValue({
      status: 200,
      message: "登录成功",
      data: {
        access_token: "mock_access_token",
        refresh_token: "mock_refresh_token",
      },
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.loginMutation.mutateAsync({
        email: "example@example.com",
        password: "123456",
      });
    });

    expect(setTokensMock).toHaveBeenCalledWith({
      access_token: "mock_access_token",
      refresh_token: "mock_refresh_token",
    });
    expect(toast.success).toHaveBeenCalledWith("登录成功", { position: "top-center" });
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ["user"] });
    expect(setAuthModalStateMock).toHaveBeenCalledWith(false);
  });

  it("should handle login error side effects", async () => {
    const queryClient = new QueryClient();
    const wrapper = createWrapper(queryClient);
    vi.mocked(login).mockRejectedValue(new Error("登录失败"));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await expect(
        result.current.loginMutation.mutateAsync({
          email: "example@example.com",
          password: "123456",
        }),
      ).rejects.toThrow("登录失败");
    });

    expect(toast.error).toHaveBeenCalledWith("登录失败", { position: "top-center" });
    expect(setTokensMock).not.toHaveBeenCalled();
    expect(setAuthModalStateMock).not.toHaveBeenCalled();
  });

  it("should handle register success side effects", async () => {
    const queryClient = new QueryClient();
    const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");
    const wrapper = createWrapper(queryClient);

    vi.mocked(register).mockResolvedValue({
      status: 200,
      message: "注册成功",
      data: {
        access_token: "mock_access_token",
        refresh_token: "mock_refresh_token",
      },
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.registerMutation.mutateAsync({
        email: "example@example.com",
        verification_code: "123456",
        password: "123456",
      });
    });

    expect(toast.success).toHaveBeenCalledWith("注册成功", { position: "top-center" });
    expect(setTokensMock).toHaveBeenCalledWith({
      access_token: "mock_access_token",
      refresh_token: "mock_refresh_token",
    });
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ["user"] });
    expect(setAuthModalStateMock).toHaveBeenCalledWith(false);
  });

  it("should handle register error side effects", async () => {
    const queryClient = new QueryClient();
    const wrapper = createWrapper(queryClient);
    vi.mocked(register).mockRejectedValue(new Error("注册失败"));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await expect(
        result.current.registerMutation.mutateAsync({
          email: "example@example.com",
          verification_code: "123456",
          password: "123456",
        }),
      ).rejects.toThrow("注册失败");
    });

    expect(toast.error).toHaveBeenCalledWith("注册失败", { position: "top-center" });
    expect(setTokensMock).not.toHaveBeenCalled();
    expect(setAuthModalStateMock).not.toHaveBeenCalled();
  });
});
