import { useAuthGuard } from "@/features/auth/hooks";
import { useAuthStore } from "@/store/authStore";
import { renderHook } from "@testing-library/react";

vi.mock("@/store/authStore", () => ({
  useAuthStore: vi.fn(),
}));

describe("useAuthGuard", () => {
  it("should return true when access_token and refresh_token are not empty", () => {
    // Arrange
    vi.mocked(useAuthStore).mockReturnValue({
      access_token: "random_access_token",
      refresh_token: "random_refresh_token",
    });
    // Act
    const { result } = renderHook(() => useAuthGuard());
    // Assert
    expect(result.current).toEqual({
      isAuthenticated: true,
    });
  });
  it("should return false when access_token or refresh_token is empty", () => {
    // Arrange
    vi.mocked(useAuthStore).mockReturnValue({
      access_token: "",
      refresh_token: "random_refresh_token",
    });
    // Act
    const { result } = renderHook(() => useAuthGuard());
    // Assert
    expect(result.current).toEqual({
      isAuthenticated: false,
    });
  });
});
