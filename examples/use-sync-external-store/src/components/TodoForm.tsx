import { useCallback, useRef } from "react";

import { useTodoStore } from "../hooks/useTodoStore";
import { mergeRefs } from "../utils/mergeRefs";

export function TodoForm() {
  const [_, todoStore] = useTodoStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocusOnRefInit = useCallback((node: HTMLInputElement | null) => {
    if (!node) {
      return;
    }
    node.focus();
  }, []);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (!inputRef.current?.value) {
      return;
    }

    todoStore.addItem({
      id: Date.now(),
      title: inputRef.current.value,
      isCompleted: false,
    });

    inputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        할일 입력
        <input
          ref={mergeRefs(handleFocusOnRefInit, inputRef)}
          type="text"
          name="todoInput"
        />
      </label>
      <button>추가</button>
    </form>
  );
}
