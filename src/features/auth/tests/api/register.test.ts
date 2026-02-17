import { register } from "@/features/auth/api";
import request from "@/utils/request";
import type { authResponseSchema, registerSchema } from "@/features/auth/schema";
import type z from "zod";

type RegisterInputs = z.infer<typeof registerSchema>;
type RegisterResponse = z.infer<typeof authResponseSchema>;

vi.mock("@/utils/request", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("register api", () => {
  it("should call /user/register with payload", async () => {
    // Arrange
    const payload: RegisterInputs = {
      email: "test@example.com",
      verification_code: "123456",
      password: "123456",
    };
    vi.mocked(request.post<RegisterResponse>).mockResolvedValue({
      status: 200,
      message: "注册成功",
      data: {
        access_token: "mock_access_token",
        refresh_token: "mock_refresh_token",
      },
    });
    // Act
    await register(payload);
    // Assert
    expect(request.post).toHaveBeenCalledWith("/user/register", payload);
  });
});
