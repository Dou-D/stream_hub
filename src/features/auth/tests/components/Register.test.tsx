import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { register } from "@/features/auth/api";
import { useAuthGuard } from "@/features/auth/hooks";
import { useUIStore } from "@/store";

function renderAuthModal() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }, // 关闭重试，加快测试失败反馈
  });

  const user = userEvent.setup(); // 为每个测试创建独立的 user session

  const AuthModalMock = render(
    <QueryClientProvider client={queryClient}>
      <AuthModal />
    </QueryClientProvider>,
  );

  return { ...AuthModalMock, user };
}

vi.mock("@/features/auth/api");
vi.mock("@/features/auth/hooks/useAuthGuard");
vi.mock("@/store");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Register Component", () => {
  it("should render register form when switch to register", async () => {
    vi.mocked(useAuthGuard).mockReturnValue({
      isAuthenticated: false,
      hasHydrated: true,
    });
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: true,
      setAuthModalState: vi.fn(),
    });
    const { user } = renderAuthModal();
    const switchButton = screen.getByText(/还没有账号/);
    await user.click(switchButton);
    expect(screen.getByLabelText("验证码")).toBeInTheDocument();
  });
  it("should the button render Spinner when register is in progress", async () => {
    // Arrange
    vi.mocked(useAuthGuard).mockReturnValue({
      isAuthenticated: false,
      hasHydrated: true,
    });
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: true,
      setAuthModalState: vi.fn(),
    });
    const { user } = renderAuthModal();

    vi.mocked(register).mockImplementation(() => new Promise(() => {})); // 模拟一个永远不结束的登录请求
    const switchButton = screen.getByText(/还没有账号/);
    // Act
    await user.click(switchButton); // 切换到注册表单
    const emailInput = screen.getByLabelText("邮箱");
    const verifyCodeInput = screen.getByLabelText("验证码");
    const passwordInput = screen.getByLabelText("密码");
    const registerButton = screen.getByText("注册账号按钮");
    // Act
    await user.type(emailInput, "example@example.com");
    await user.type(verifyCodeInput, "123456");
    await user.type(passwordInput, "123456");
    await user.click(registerButton);
    // Assert
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
