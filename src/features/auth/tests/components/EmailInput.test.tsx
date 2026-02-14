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

vi.mock("@/features/auth/hooks");
vi.mock("@/store");

describe("EmailInput Component", () => {
  it("should render error message when email input is invalid", async () => {
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
    const emailInput = screen.getByLabelText("邮箱");
    // Act
    await user.type(emailInput, "123");
    await user.click(submitButton);
    // Assert
    expect(screen.queryByText(/请输入正确的邮箱格式/)).toBeInTheDocument();
  });
  it("should not render error message when email input is valid", async () => {
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
    const emailInput = screen.getByLabelText("邮箱");
    // Act
    await user.type(emailInput, "example@example.com");
    await user.click(submitButton);
    // Assert
    expect(screen.queryByText(/请输入正确的邮箱格式/)).not.toBeInTheDocument();
  });
});
