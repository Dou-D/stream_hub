import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { EmailInput } from "@/features/auth/components/EmailInput";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { VerifyInput } from "@/features/auth/components/VerifyInput";
import { registerSchema } from "@/features/auth/schema";

type RegisterInputs = z.infer<typeof registerSchema>;

export const RegisterCard: React.FC = () => {
  const { registerMutation } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
  });
  const { mutate: registerMutate, isPending } = registerMutation;
  const onSubmit: SubmitHandler<RegisterInputs> = (data) => registerMutate(data);
  const emailValue = watch("email", "");
  return (
    <Card className="w-full gap-0 rounded-none border-0 bg-transparent py-0 shadow-none">
      <CardHeader className="space-y-1 px-0">
        <CardTitle className="text-xl">注册账号</CardTitle>
        <CardDescription>输入您的邮箱和验证码注册账号</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-5">
            {/* 邮箱输入框 */}
            <EmailInput label="邮箱" errorMsg={errors.email?.message} {...register("email")} />
            {/* 验证码输入框 */}
            <VerifyInput
              label="验证码"
              email={emailValue}
              validateEmailBeforeSend={() => trigger("email")}
              errorMsg={errors.verification_code?.message}
              {...register("verification_code")}
            />
            {/* 密码输入框 */}
            <PasswordInput
              label="密码"
              errorMsg={errors.password?.message}
              {...register("password")}
            />
          </div>
          <Button type="submit" className="h-10 w-full rounded-lg">
            <span className="sr-only">注册账号按钮</span>
            {isPending ? <Spinner data-icon="inline-start" role="progressbar" /> : "注册"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
