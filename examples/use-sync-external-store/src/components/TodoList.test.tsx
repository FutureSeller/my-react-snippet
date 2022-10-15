import { render, renderHook, act } from "@testing-library/react";

import { TodoList } from "./TodoList";
import { useTodoStore } from "../hooks/useTodoStore";
import { todos } from "../fixture/todo";

const context = describe;
const [todoItem] = todos;

describe("TodoList", () => {
  context("render TodoList without todos", () => {
    test("render TodoList", () => {
      const { container } = render(<TodoList />);
      expect(container).toHaveTextContent("할일이 없어요!");
    });
  });

  context("render TodoList with todos", () => {
    let renderHookResult: ReturnType<typeof renderHook<ReturnType<typeof useTodoStore>, any>>;
    
    beforeEach(() => {
      renderHookResult = renderHook(() => useTodoStore());
    });

    test("add / remove todo item", () => {
      const { container } = render(<TodoList />);

      const { result } = renderHookResult;

      act(() => result.current[1].addItem(todoItem));

      expect(container).toHaveTextContent("공부를 해보자");

      act(() => result.current[1].removeItem(1))

      expect(container).toHaveTextContent("할일이 없어요!");
    });
  });
});
