import { memo, useEffect } from "react";

type DeeperProps = {
  counter: {
    counter: number;
  };
};
const DeeperComponent = memo((props: DeeperProps) => {
  useEffect(() => {
    console.log("DeeperComponent is rendered : ", props.counter.counter);
  });

  return <div>{props.counter.counter}</div>;
});

DeeperComponent.displayName = "DeeperComponent";
export default DeeperComponent;
