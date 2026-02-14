import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserProfile {
  avatar_url: string; // 头像
  background_url: string; // 背景图
  email: string; // 邮箱
  favourite_count: number; // 收藏数
  follow_count: number; // 关注数
  follower_count: number; // 粉丝数
  gender: number; // 性别
  nickname: string; // 昵称
  signature: string; // 签名
  work_count: number; // 作品数
}

interface AuthState {
  user: UserProfile | null;
  access_token: string | null;
  refresh_token: string | null;
}
type SetTokensParams = {
  access_token: string;
  refresh_token: string;
};
// 2. 定义操作方法 (Keys 和 Value 都是必要的)
interface AuthActions {
  setTokens: (params: SetTokensParams) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      refresh_token: null,
      setTokens: ({ access_token, refresh_token }) =>
        set({
          access_token,
          refresh_token,
        }),
      logout: () =>
        set({
          user: null,
          access_token: null,
          refresh_token: null,
        }),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => localStorage),
      // 只持久化 access_token 和 refresh_token
      partialize: (state) => ({
        access_token: state.access_token,
        refresh_token: state.refresh_token,
      }),
    },
  ),
);
