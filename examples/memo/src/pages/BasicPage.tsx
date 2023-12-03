import { useState } from "react";
import Component from "../components/Component";
import DeeperComponent from "../components/DeepComponent";
import { HR } from "../components/HR";

const outsideCounter = { counter: 200 }; // reference should be same.

export function BasicPage() {
  const [, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((counter) => counter + 1);
  };

  const insideCounter = { counter: 300 }; // reference should be different on every render.

  return (
    <div>
      <HR />
      <Component counter={100} />
      <DeeperComponent counter={{ counter: 100 }} />
      <DeeperComponent counter={outsideCounter} />
      <DeeperComponent counter={insideCounter} />
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
