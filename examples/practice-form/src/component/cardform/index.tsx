import { useId, useLayoutEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { CardNumberInput } from "./CardNumberInput";
import { CardExpiryInput } from "./CardExpiryInput";

import { initialFormState } from "./form";

import type { ElementRef } from "react";
import type { FormStateType } from "./form";

export function CardForm() {
  const cardFormId = useId();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormStateType>({ mode: "all", defaultValues: initialFormState });

  const onSubmit = (data: FormStateType) => console.log(data);

  const cardNumberInput = useRef<ElementRef<typeof CardNumberInput> | null>(
    null
  );
  const cardExpiryInput = useRef<ElementRef<typeof CardExpiryInput> | null>(
    null
  );

  useLayoutEffect(() => {
    cardNumberInput.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <label
          htmlFor={`${cardFormId}-cardInput`}
          style={{ fontSize: "18px", marginRight: "8px" }}
        >
          카드 번호
        </label>
        <CardNumberInput
          id={`${cardFormId}-cardInput`}
          ref={cardNumberInput}
          name="card"
          register={register}
          onComplete={() => {
            cardExpiryInput.current?.focus();
            return "";
          }}
        />
      </div>
      {errors.card && (
        <p
          style={{
            fontSize: "12px",
            color: "tomato",
            margin: "0",
          }}
        >
          {errors.card.message}
        </p>
      )}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <label
          htmlFor={`${cardFormId}-cardExpiry`}
          style={{ fontSize: "18px", marginRight: "8px" }}
        >
          만료 기간
        </label>
        <CardExpiryInput
          id={`${cardFormId}-cardExpiry`}
          ref={cardExpiryInput}
          name="expiry"
          register={register}
        />
      </div>
      {errors.expiry && (
        <p
          style={{
            fontSize: "12px",
            color: "tomato",
            margin: "0",
          }}
        >
          {errors.expiry.message}
        </p>
      )}
      <button style={{ width: "100%" }}>submit</button>
    </form>
  );
}
