import { forwardRef } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface PasswordInputProps extends React.ComponentProps<"input"> {
  label?: string; // 输入框标签（不是id）
  errorMsg?: string; // 错误信息字符串
}

export const EmailInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, errorMsg, className, ...props }, ref) => {
    return (
      <div className="grid gap-2">
        {/* 只有在有错误时才显示提示 */}
        <Field data-invalid={!!errorMsg}>
          <FieldLabel htmlFor={props.id || "email"}>{label || "邮箱"}</FieldLabel>
          {/* 邮箱格式正确时不显示提示 */}
          <Input
            id={props.id || "email"}
            type="email"
            placeholder="请输入邮箱"
            aria-invalid={!!errorMsg}
            className={className}
            ref={ref}
            {...props}
          />
          <FieldDescription>{errorMsg}</FieldDescription>
        </Field>
      </div>
    );
  },
);

EmailInput.displayName = "EmailInput";
