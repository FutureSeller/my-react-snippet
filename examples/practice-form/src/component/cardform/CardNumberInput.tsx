import { useRef, forwardRef, useImperativeHandle } from "react";

import type { HTMLProps } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { FormStateType } from "./form";

interface CardNumberInputHandle {
  focus: () => void;
}

interface Props extends HTMLProps<HTMLInputElement> {
  register: UseFormReturn<FormStateType>["register"];
  defaultValue?: string;
  id: string;
  name: "card";
  onComplete: () => string;
}

export const CardNumberInput = forwardRef<CardNumberInputHandle, Props>(
  ({ register, id, name = "card", onComplete }, cardNumberInputRef) => {
    const { ref, onChange, ...rest } = register(name, {
      required: "카드 번호를 입력해주세요",
      validate: {
        format: (value) =>
          /^\d{4} \d{4} \d{4} \d{4}$/.test(value)
            ? onComplete()
            : "올바르지 않은 포맷입니다.",
      },
    });
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(cardNumberInputRef, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    return (
      <input
        id={id}
        placeholder="•••• •••• •••• ••••"
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        onChange={(e) => {
          if (!inputRef.current) {
            return;
          }

          const formattedCardNumber = e.target.value || "";
          const cardNumber = formattedCardNumber.replace(/\s/g, "");

          let cursorPosition = inputRef.current.selectionStart || 0;

          inputRef.current.value =
            cardNumber.match(/(\d{1,4})/g)?.join(" ") || cardNumber;

          onChange(e);

          if (inputRef.current.value[cursorPosition - 1] === " ") {
            cursorPosition = cursorPosition + 1;
          }
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }}
        {...rest}
      />
    );
  }
);

CardNumberInput.displayName = "CardNumberInput";
