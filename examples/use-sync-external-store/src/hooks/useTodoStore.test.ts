import { renderHook, act } from "@testing-library/react";

import { useTodoStore } from "./useTodoStore";
import { todos } from "../fixture/todo";

// 흠... 근데 TodoStore를 검증했으면 안해도 되는거 아닌가 싶긴하네.
test("useTodoStore", () => {
  const [todoItem] = todos;

  const { result } = renderHook(() => useTodoStore());

  expect(result.current[0]).toEqual({
    todos: [],
  });

  act(() => result.current[1].addItem(todoItem));

  expect(result.current[0]).toEqual({
    todos: [todoItem],
  });
});
