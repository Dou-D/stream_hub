import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { EmailInput } from "@/features/auth/components/EmailInput";

const loginSchema = z.object({
  email: z.email({ message: "请输入正确的邮箱格式" }),
  password: z.string().min(6, { message: "密码长度不能少于6位" }),
});

export type LoginInputs = z.infer<typeof loginSchema>;
export const LoginCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { loginMutation } = useAuth();
  const { mutate: loginMutate, isPending } = loginMutation;
  const onSubmit: SubmitHandler<LoginInputs> = (data) => loginMutate(data);
  return (
    <Card className="w-full gap-0 rounded-none border-0 bg-transparent py-0 shadow-none">
      <CardHeader className="space-y-1 px-0">
        <CardTitle className="text-xl">密码登录</CardTitle>
        <CardDescription>输入您的邮箱和密码登录</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-5">
            {/* 邮箱输入框 */}
            <EmailInput label="邮箱" errorMsg={errors.email?.message} {...register("email")} />
            {/* 密码输入框 */}
            <PasswordInput
              label="密码"
              errorMsg={errors.password?.message}
              {...register("password")}
            />
          </div>
          <Button
            type="submit"
            className="h-10 w-full rounded-lg"
            disabled={isPending}
            aria-label={isPending ? "正在登录" : "登录"}
          >
            <span className="sr-only">登录按钮</span>
            {isPending ? <Spinner data-icon="inline-start" role="progressbar" /> : "登录"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
