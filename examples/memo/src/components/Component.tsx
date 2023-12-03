import { memo, useEffect } from "react";

type Props = {
  counter: number;
};

const Component = memo((props: Props) => {
  useEffect(() => {
    console.log("Component is rendered");
  });

  return <div>{props.counter}</div>;
});

Component.displayName = "Component";
export default Component;
