import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoginCard } from "@/components/LoginCard/LoginCard";
import { X } from "lucide-react";
import { RegisterCard } from "@/components/LoginCard/RegisterCard";

export const LoginModal: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // isLogin = true 登录模态框，false 注册模态框
  const handleSwitch = () => setIsLogin(!isLogin); // 切换 Modal 登录 or 注册
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>登录</Button>
      </AlertDialogTrigger>
      {/* 模态框的右上角是一个icon x 用于关闭模态框 */}
      <AlertDialogContent className="w-full p-0">
        <AlertDialogTitle className="flex justify-end p-2">
          <AlertDialogCancel>
            <X className="h-6 w-6" />
          </AlertDialogCancel>
          <AlertDialogDescription>
            {/* 占位符,AlertDialogContent必须要求有一个AlertDialogDescription,否则控制台有warning */}
          </AlertDialogDescription>
        </AlertDialogTitle>
        {isLogin ? (
          <LoginCard isLogin={isLogin} onSwitch={handleSwitch} />
        ) : (
          <RegisterCard isLogin={isLogin} onSwitch={handleSwitch} />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
