import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import { useUIStore } from "@/store";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { login } from "@/features/auth/api";

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
vi.mock("@/features/auth/api");

beforeEach(() => {
  vi.clearAllMocks();
});
describe("LoginCard Component", () => {
  it("should render error message when input is invalid", async () => {
    // Arrange
    const setAuthModalStateMock = vi.fn();
    vi.mocked(useAuthGuard).mockReturnValue({
      isAuthenticated: false,
      hasHydrated: true,
    });
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: true,
      setAuthModalState: setAuthModalStateMock,
    });
    const { user } = renderAuthModal();
    const emailInput = screen.getByLabelText("邮箱");
    const passwordInput = screen.getByLabelText("密码");
    const loginButton = screen.getByRole("button", { name: "登录" });
    // Act
    await user.click(loginButton);
    await user.type(emailInput, "invalid email");
    await user.type(passwordInput, "in");
    // Assert
    expect(screen.getByText(/请输入正确的邮箱格式/)).toBeInTheDocument();
    expect(screen.getByText(/密码长度不能少于6位/)).toBeInTheDocument();
  });
  it("should not render error message when input is valid", async () => {
    // Arrange
    const setAuthModalStateMock = vi.fn();
    vi.mocked(useAuthGuard).mockReturnValue({
      isAuthenticated: false,
      hasHydrated: true,
    });
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: true,
      setAuthModalState: setAuthModalStateMock,
    });
    const { user } = renderAuthModal();
    const emailInput = screen.getByLabelText("邮箱");
    const passwordInput = screen.getByLabelText("密码");
    const loginButton = screen.getByRole("button", { name: "登录" });
    // Act
    await user.click(loginButton);
    await user.type(emailInput, "example@example.com");
    await user.type(passwordInput, "123456");
    // Assert
    expect(screen.queryByText(/请输入正确的邮箱格式/)).not.toBeInTheDocument();
    expect(screen.queryByText(/密码长度不能少于6位/)).not.toBeInTheDocument();
  });
  it("should the button render Spinner when login is in progress", async () => {
    // Arrange
    const setAuthModalStateMock = vi.fn();
    vi.mocked(useAuthGuard).mockReturnValue({
      isAuthenticated: false,
      hasHydrated: true,
    });
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: true,
      setAuthModalState: setAuthModalStateMock,
    });
    vi.mocked(login).mockImplementation(() => new Promise(() => {})); // 模拟一个永远不结束的登录请求
    const { user } = renderAuthModal();
    const emailInput = screen.getByLabelText("邮箱");
    const passwordInput = screen.getByLabelText("密码");
    const loginButton = screen.getByRole("button", { name: "登录" });
    // Act
    await user.type(emailInput, "example@example.com");
    await user.type(passwordInput, "123456");
    await user.click(loginButton);
    // Assert
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
