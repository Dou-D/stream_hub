import { fireEvent, render, screen } from "@testing-library/react";
import { useAuthGuard } from "@/features/auth/hooks";
import { useUIStore } from "@/store/uiStore";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/features/auth/hooks");
vi.mock("@/store/uiStore");

const queryClient = new QueryClient();
function AuthModalMock() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthModal />
    </QueryClientProvider>
  );
}
describe("AuthModal Component", () => {
  const setAuthModalStateMock = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render Modal when the user is not logged in.", async () => {
    // Arrange
    vi.mocked(useAuthGuard).mockReturnValue({
      isAuthenticated: false,
    });
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: true,
      setAuthModalState: setAuthModalStateMock,
      a: 1,
    });
    // Act
    render(<AuthModalMock />);
    // Assert
    expect(screen.getByText(/还没有账号?/)).toBeInTheDocument();
  });
  it("should not render Modal when the user is logged in.", async () => {
    // Arrange
    vi.mocked(useAuthGuard).mockReturnValue({
      isAuthenticated: true,
    });
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: false,
      setAuthModalState: setAuthModalStateMock,
    });
    // Act
    render(<AuthModalMock />);
    // Assert
    expect(screen.queryByText(/还没有账号?/)).not.toBeInTheDocument();
  });
  it("should render register card when the user clicks the switch button.", () => {
    // Arrange
    vi.mocked(useAuthGuard).mockReturnValue({ isAuthenticated: false });
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: true,
      setAuthModalState: vi.fn(),
    });
    // Act
    render(<AuthModalMock />);
    const switchBtn = screen.getByText(/还没有账号/);
    fireEvent.click(switchBtn);
    // Assert
    expect(screen.getByText(/去登录/)).toBeInTheDocument();
    expect(screen.queryByText(/还没有账号/)).not.toBeInTheDocument();
  });
  it("should close modal when the user clicks the close button.", () => {
    // Arrange
    vi.mocked(useUIStore).mockReturnValue({
      isAuthOpen: true,
      setAuthModalState: setAuthModalStateMock,
    });
    // Act
    render(<AuthModalMock />);
    const closeBtn = screen.getByText(/关闭/);
    fireEvent.click(closeBtn);
    // Assert
    expect(setAuthModalStateMock).toHaveBeenCalledWith(false);
  });
});
