import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthModal } from "@/features/auth/components/AuthModal";
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

vi.mock("@/features/auth/hooks/useAuthGuard");
vi.mock("@/store");

describe("PasswordInput Component", () => {
  it("should render error message when password input is invalid", async () => {
    vi.mocked(useAuthGuard).mockReturnValue({
      isAuthenticated: false,
    });
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: true,
      setAuthModalState: vi.fn(),
    });
    // Arrange
    const { user } = renderAuthModal();
    // Arrange
    const submitButton = screen.getByText(/登录按钮/);
    const passwordInput = screen.getByLabelText("密码");
    // Act
    await user.type(passwordInput, "123");
    await user.click(submitButton);
    // Assert
    expect(screen.queryByText(/密码长度不能少于6位/)).toBeInTheDocument();
  });
  it("should not render error message when password input is valid", async () => {
    vi.mocked(useAuthGuard).mockReturnValue({
      isAuthenticated: false,
    });
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: true,
      setAuthModalState: vi.fn(),
    });
    // Arrange
    const { user } = renderAuthModal();
    // Arrange
    const submitButton = screen.getByText(/登录按钮/);
    const passwordInput = screen.getByLabelText("密码");
    // Act
    await user.type(passwordInput, "123456");
    await user.click(submitButton);
    // Assert
    expect(screen.queryByText(/密码长度不能少于6位/)).not.toBeInTheDocument();
  });
  it("should toggle password visibility when clicking eye button", async () => {
    vi.mocked(useAuthGuard).mockReturnValue({
      isAuthenticated: false,
    });
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: true,
      setAuthModalState: vi.fn(),
    });
    // Arrange
    const { user } = renderAuthModal();
    const switchButton = screen.getByText(/还没有账号/);
    await user.click(switchButton); // 切换到注册表单
    const passwordInput = screen.getByLabelText("密码");
    expect(passwordInput).toHaveAttribute("type", "password");
    const showPasswordBtn = screen.getByRole("button", { name: "显示密码" });
    await user.click(showPasswordBtn);
    expect(passwordInput).toHaveAttribute("type", "text");
    const hidePasswordBtn = screen.getByRole("button", { name: "隐藏密码" });
    await user.click(hidePasswordBtn);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
