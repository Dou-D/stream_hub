import { forwardRef } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useAuth, useCountdown } from "@/features/auth/hooks";
interface VerifyInputProps extends React.ComponentProps<"input"> {
  label?: string; // 输入框标签（不是id）
  errorMsg?: string; // 错误信息字符串
  email: string;
  validateEmailBeforeSend?: () => Promise<boolean>;
}

export const VerifyInput = forwardRef<HTMLInputElement, VerifyInputProps>(
  ({ label, errorMsg, className, email, validateEmailBeforeSend, ...props }, ref) => {
    const { verifyMutation } = useAuth();
    const { mutate: verifyMutate, isPending } = verifyMutation;

    const { count, startCountdown } = useCountdown();
    const handleSendVerificationCode = async () => {
      const isEmailValid = (await validateEmailBeforeSend?.()) ?? !!email;
      if (!isEmailValid) return;
      startCountdown(60); // 开始60秒倒计时
      verifyMutate({
        email,
      });
    };
    return (
      <div className="grid gap-2">
        <Field data-invalid={!!errorMsg}>
          <FieldLabel htmlFor={props.id || "verification_code"}>{label || "验证码"}</FieldLabel>
          <ButtonGroup className="w-full">
            <Input
              id={props.id || "verification_code"}
              type="number"
              placeholder="123456"
              aria-invalid={!!errorMsg}
              className={className}
              {...props}
              ref={ref}
            />
            <Button
              variant="outline"
              type="button"
              className="h-10 rounded-r-lg px-4"
              onClick={handleSendVerificationCode}
              disabled={count > 0 || isPending}
            >
              {count > 0 ? `${count}s` : "发送验证码"}
            </Button>
          </ButtonGroup>
          <FieldDescription>{errorMsg}</FieldDescription>
        </Field>
      </div>
    );
  },
);

VerifyInput.displayName = "VerifyInput";
