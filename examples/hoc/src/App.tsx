import "./App.css";

import { useState } from "react";
import { Button } from "./component/Button";
import { PersonInformation } from "./component/PersonInformation";

function App() {
  const [count, setCount] = useState(1);

  return (
    <div className="App">
      <h1 className="App__title">hoc example</h1>
      <div className="App__Actions">
        <Button
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          add person
        </Button>
      </div>
      <div className="App__layout">
        {Array.from({ length: count }).map((_, index) => (
          <PersonInformation key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
