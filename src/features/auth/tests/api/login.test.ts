import request from "@/utils/request";
import { login } from "@/features/auth/api/login";

vi.mock("@/utils/request", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("login api", () => {
  it("should call /user/login with payload", async () => {
    const payload = {
      email: "example@example.com",
      password: "123456",
    };

    vi.mocked(request.post).mockResolvedValue({
      status: 200,
      message: "ok",
      data: {
        access_token: "mock_access_token",
        refresh_token: "mock_refresh_token",
      },
    });

    await login(payload);

    expect(request.post).toHaveBeenCalledWith("/user/login", payload);
  });
});
