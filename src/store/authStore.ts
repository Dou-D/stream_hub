import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authResponseSchema } from "@/features/auth/schema";
import z from "zod";

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
const TokenSchema = authResponseSchema.shape.data;
type TokenData = z.infer<typeof TokenSchema>;

type AuthState = TokenData & {
  user_profile: UserProfile | null;
  _hasHydrated?: boolean; // 是否已从存储加载状态
};

// 2. 定义操作方法 (Keys 和 Value 都是必要的)
interface AuthActions {
  setTokens: (params: TokenData) => void;
  logout: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user_profile: null,
      access_token: null,
      refresh_token: null,
      _hasHydrated: false,
      setTokens: ({ access_token, refresh_token }) =>
        set({
          access_token,
          refresh_token,
        }),
      logout: () =>
        /* 不用再手动控制Modal的开关了，直接清除 token 就好了，hooks/useAuthGuard 用来监听token变化
        store/uiStore.ts控制Modal的开关
        components/AuthModal.tsx 监听 hooks/useAuthGuard 的状态来控制 Modal 的显示 */
        set({
          user_profile: null,
          access_token: null,
          refresh_token: null,
        }),
      setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => localStorage),
      // 只持久化 access_token 和 refresh_token
      partialize: (state) => ({
        access_token: state.access_token,
        refresh_token: state.refresh_token,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
