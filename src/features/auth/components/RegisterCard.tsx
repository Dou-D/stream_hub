import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { EmailInput } from "@/features/auth/components/EmailInput";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/features/auth/hooks/useAuth";

const registerSchema = z.object({
  email: z.email({ message: "请输入正确的邮箱格式" }),
  verifyCode: z.string().length(6, { message: "验证码只能为6位数字" }),
  password: z.string().refine((val) => val.length === 6, { message: "密码长度不能少于6位" }),
});

export type RegisterInputs = z.infer<typeof registerSchema>;

export const RegisterCard: React.FC = () => {
  const { registerMutation } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const { mutate: registerMutate, isPending } = registerMutation;
  const onSubmit: SubmitHandler<RegisterInputs> = (data) => registerMutate(data);
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
            <div className="grid gap-2">
              <Field data-invalid={!!errors.verifyCode}>
                <FieldLabel htmlFor="verifyCode">验证码</FieldLabel>
                <ButtonGroup className="w-full">
                  <Input
                    id="verifyCode"
                    type="number"
                    placeholder="123456"
                    aria-invalid={!!errors.verifyCode}
                    className="h-10 rounded-l-lg"
                    {...register("verifyCode")}
                  />
                  <Button variant="outline" className="h-10 rounded-r-lg px-4">
                    获取验证码
                  </Button>
                </ButtonGroup>
                <FieldDescription>{errors.verifyCode?.message}</FieldDescription>
              </Field>
            </div>
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
