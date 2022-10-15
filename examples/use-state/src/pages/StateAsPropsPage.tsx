import { ComponentProps, useState } from "react";
import type { HTMLProps } from "react";

const Parent = (props: ComponentProps<typeof PropsAsInitialState>) => {
  return <PropsAsInitialState value={props.value} />;
};

// initialize of state from props runs when the component is first created.
const PropsAsInitialState = (props: HTMLProps<HTMLDivElement>) => {
  const { value, ...attributes } = props;
  const [inputValue] = useState(value);

  return <div {...attributes}>{inputValue}</div>;
};

export function StateAsPropsPage() {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setToggle((prev) => !prev);
        }}
      >
        toggle
      </button>
      <Parent value={toggle ? "hello" : "world"} />
    </div>
  );
}
