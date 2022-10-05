import { useRef, forwardRef, useImperativeHandle } from "react";

import type { HTMLProps } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { FormStateType } from "./form";

interface CardExpiryInputHandle {
  focus: () => void;
}

interface Props extends HTMLProps<HTMLInputElement> {
  register: UseFormReturn<FormStateType>["register"];
  defaultValue?: string;
  id: string;
  name: "expiry";
}

export const CardExpiryInput = forwardRef<CardExpiryInputHandle, Props>(
  ({ register, id, name }, cardExpirtyInputRef) => {
    const { ref, onChange, ...rest } = register(name, {
      required: "만료 기간을 입력해주세요",
      pattern: {
        value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
        message: "올바르지 않은 포맷입니다.",
      },
    });
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(cardExpirtyInputRef, () => ({
      focus() {
        inputRef.current?.focus();
      },
    }));

    return (
      <input
        id={id}
        placeholder="MM/YY"
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        onChange={(e) => {
          if (!inputRef.current) {
            return;
          }

          inputRef.current.value =
            e.target.value.match(/(\d{1,2})/g)?.join("/") || e.target.value;

          onChange(e);
        }}
        {...rest}
      />
    );
  }
);

CardExpiryInput.displayName = "CardExpiryInput";
