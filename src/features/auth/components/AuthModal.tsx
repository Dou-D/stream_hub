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

export const AuthModal: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // isLogin = true 登录模态框，false 注册模态框
  const handleSwitch = () => setIsLogin(!isLogin); // 切换 Modal 登录 or 注册
  const { isAuthOpen, setAuthModalState } = useUIStore();
  const { isAuthenticated } = useAuthGuard();
  useEffect(() => {
    // 如果用户未认证，打开登录模态框
    if (!isAuthenticated) {
      setAuthModalState(true);
    } else {
      setAuthModalState(false);
    }
  }, [isAuthenticated, setAuthModalState]);
  return (
    <AlertDialog open={isAuthOpen} onOpenChange={(o) => setAuthModalState(o)}>
      <AlertDialogTrigger asChild>
        <Button>登录</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full p-0">
        <AlertDialogTitle className="flex justify-end p-2">
          {/* 关闭按钮 */}
          <AlertDialogCancel>
            <span className="sr-only">关闭</span>
            <X className="h-6 w-6" />
          </AlertDialogCancel>
          <AlertDialogDescription>
            {/* 占位符,AlertDialogContent必须要求有一个AlertDialogDescription,否则控制台有warning */}
          </AlertDialogDescription>
        </AlertDialogTitle>

        {isLogin ? <LoginCard /> : <RegisterCard />}
        <Button variant="link" onClick={handleSwitch} className="pb-4">
          {isLogin ? "还没有账号?" : "去登录"}
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};
