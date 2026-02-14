import { useState, forwardRef } from "react";
import { Eye, EyeOffIcon } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";

interface PasswordInputProps extends React.ComponentProps<"input"> {
  label?: string; // 输入框标签（不是id）
  errorMsg?: string; // 错误信息字符串
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, errorMsg, className, ...props }, ref) => {
    const [eye, setEye] = useState(false);
    return (
      <div className="grid gap-2">
        <Field data-invalid={!!errorMsg}>
          <FieldLabel htmlFor={props.id || "password"}>{label}</FieldLabel>
          <InputGroup data-invalid={!!errorMsg} className={className}>
            <InputGroupInput
              ref={ref}
              id={props.id || "password"}
              aria-invalid={!!errorMsg}
              aria-label={label || "password"}
              type={eye ? "text" : "password"}
              placeholder="******"
              className="h-10"
              {...props}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton type="button" onClick={() => setEye(!eye)}>
                <span className="sr-only">{eye ? "隐藏密码" : "显示密码"}</span>
                {eye ? <EyeOffIcon /> : <Eye />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>{errorMsg}</FieldDescription>
        </Field>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
