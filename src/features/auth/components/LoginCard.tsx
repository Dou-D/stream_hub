import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

import { useAuth } from "@/features/auth/hooks/useAuth";

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
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    loginMutate({
      email: data.email,
      password: data.password,
    });
  };
  return (
    <Card className="sm:w-full">
      <CardHeader>
        <CardTitle>密码登录</CardTitle>
        <CardDescription>输入您的邮箱和密码登录</CardDescription>
      </CardHeader>
      <CardContent className="h-85">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6 w-full items-center"
        >
          <div className="flex flex-col gap-10 w-full">
            {/* 邮箱输入框 */}
            <div className="grid gap-2">
              {/* 只有在有错误时才显示提示 */}
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                {/* 邮箱格式正确时不显示提示 */}
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入邮箱"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                  disabled={isPending}
                />
                <FieldDescription>{errors.email?.message}</FieldDescription>
              </Field>
            </div>
            {/* 密码输入框 */}
            <div className="grid gap-2">
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  placeholder="请输入密码"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                  disabled={isPending}
                />
                <FieldDescription>{errors.password?.message}</FieldDescription>
              </Field>
            </div>
          </div>
          <Button
            type="submit"
            className="w-1/2"
            disabled={isPending}
            aria-label={isPending ? "正在登录" : "登录"}
          >
            {isPending ? <Spinner data-icon="inline-start" /> : "登录"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
