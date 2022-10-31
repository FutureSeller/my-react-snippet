import "./App.css";

import { useState, useRef, useCallback, ElementRef } from "react";

import { SlotMachine, NAMES } from "./component/SlotMachine";
import { Dialog } from "./component/Dialog";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dialogRef = useRef<ElementRef<typeof Dialog> | null>(null);

  const getName = useCallback(() => {
    if (selectedIndex < 0) {
      return "";
    }

    const name = NAMES[selectedIndex];
    if (name.length === 2) {
      return `${name.slice(0, 1)}-${name.slice(1, 2)}`;
    }
    if (name.length === 4) {
      return name.slice(1);
    }
    return name;
  }, [selectedIndex]);

  return (
    <div className="App">
      <h1 className="App__title">Slot machine</h1>
      <div className="App__layout">
        <SlotMachine
          value={getName()}
          onAnimationEnd={() => {
            dialogRef.current?.showModal();
          }}
        />
      </div>
      <button
        onClick={() => {
          const index = Math.floor(Math.random() * NAMES.length);

          setSelectedIndex(index);
        }}
      >
        start!
      </button>
      <Dialog ref={dialogRef}>
        <h1>당첨자는 {NAMES[selectedIndex]}</h1>
        <button
          onClick={() => {
            dialogRef.current?.close();
          }}
        >
          close
        </button>
      </Dialog>
    </div>
  );
}

export default App;
