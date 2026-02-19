import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoginCard } from "@/features/auth/components/LoginCard";
import { X } from "lucide-react";
import { RegisterCard } from "@/features/auth/components/RegisterCard";
import { useUIStore } from "@/store";
import { useAuthGuard } from "@/features/auth/hooks";
import { UserAvatar } from "@/components/UserAvatar/UserAvatar";
import { Link } from "react-router";

export const AuthModal: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // isLogin = true 登录模态框，false 注册模态框
  const handleSwitch = () => setIsLogin(!isLogin); // 切换 Modal 登录 or 注册
  const { isAuthOpen, setAuthModalState } = useUIStore();
  const { isAuthenticated, hasHydrated } = useAuthGuard();

  useEffect(() => {
    // 未登录时自动弹出一次；用户手动关闭后不会被立即强制重开
    if (hasHydrated && !isAuthenticated) {
      setAuthModalState(true);
    }
  }, [hasHydrated, isAuthenticated, setAuthModalState]);

  if (!hasHydrated) return null; // 等待状态从存储加载完成，避免闪烁

  if (isAuthenticated) {
    return (
      <Link className="w-10" to="/user" aria-label="进入个人中心">
        <UserAvatar />
      </Link>
    );
  }

  return (
    <AlertDialog open={isAuthOpen} onOpenChange={setAuthModalState}>
      <AlertDialogTrigger asChild>
        <Button type="button">登录</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-[calc(100%-1.5rem)] border-0 bg-transparent p-0 shadow-none sm:max-w-md">
        <div className="relative overflow-hidden rounded-2xl border bg-background/95 shadow-2xl backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_80%_at_50%_-10%,hsl(var(--primary)/0.18),transparent)]" />
          <div className="relative p-5 sm:p-6">
            <AlertDialogTitle className="mb-5 flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-base font-semibold">{isLogin ? "欢迎回来" : "创建账号"}</p>
                <p className="text-muted-foreground text-sm">
                  {isLogin ? "输入邮箱和密码继续使用 Stream Hub" : "填写信息并完成邮箱验证"}
                </p>
              </div>
              <AlertDialogCancel variant="ghost" size="icon-sm" className="rounded-full">
                <span className="sr-only">关闭</span>
                <X className="h-5 w-5" />
              </AlertDialogCancel>
            </AlertDialogTitle>

            {isLogin ? <LoginCard /> : <RegisterCard />}

            <Button
              variant="ghost"
              onClick={handleSwitch}
              className="text-muted-foreground hover:text-foreground mt-4 w-full rounded-lg"
            >
              {isLogin ? "还没有账号?" : "去登录"}
            </Button>
          </div>
        </div>
        <AlertDialogDescription className="sr-only">
          用户认证弹窗，支持登录和注册切换
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};
