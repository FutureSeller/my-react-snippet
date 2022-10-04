import React from "react";
import { VisuallyHiddenInput } from "ui";

const labelStyle: React.CSSProperties = {
  flex: "1",
  textAlign: "center",
  padding: "16px 0",
  color: "#000",
  fontSize: "24px",
  fontWeight: 700,
  cursor: "pointer",
};

interface CustomForm extends HTMLFormElement {
  readonly fruit: HTMLInputElement;
}

export function MySingleRadioInputForm() {
  return (
    <form
      onSubmit={(e: React.FormEvent<CustomForm>) => {
        e.preventDefault();

        alert(e.currentTarget.fruit.value);
      }}
    >
      <fieldset>
        <label>오호호. 과일을 골라보렴!</label>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #fff",
            marginTop: "30px",
          }}
        >
          <label style={{ ...labelStyle, backgroundColor: "red" }}>
            <VisuallyHiddenInput
              type="radio"
              name="fruit"
              defaultValue="apple"
              defaultChecked={true}
            />
            apple
          </label>
          <label style={{ ...labelStyle, backgroundColor: "purple" }}>
            <VisuallyHiddenInput
              type="radio"
              name="fruit"
              defaultValue="grape"
            />
            grape
          </label>
          <label style={{ ...labelStyle, backgroundColor: "orange" }}>
            <VisuallyHiddenInput
              type="radio"
              name="fruit"
              defaultValue="orange"
            />
            orange
          </label>
        </div>
      </fieldset>
      <div style={{ marginTop: "12px" }}>
        <button>Submit!</button>
      </div>
    </form>
  );
}
