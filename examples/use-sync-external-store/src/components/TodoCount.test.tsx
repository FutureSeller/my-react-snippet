import { render, renderHook, act } from "@testing-library/react";

import { TodoCount } from "./TodoCount";
import { useTodoStore } from "../hooks/useTodoStore";
import { todos } from "../fixture/todo";

const context = describe;
const [todoItem] = todos;

describe("TodoCount", () => {
  context("render TodoCount without todos", () => {
    test("render", () => {
      const { container } = render(<TodoCount />);
      expect(container).toHaveTextContent("0 / 0");
    });
  });

  context("render TodoCount with todos", () => {
    let renderHookResult: ReturnType<typeof renderHook<ReturnType<typeof useTodoStore>, any>>;
    
    beforeEach(() => {
      renderHookResult = renderHook(() => useTodoStore());
    });

    test("add / toggle / remove the todo", () => {
      const { container } = render(<TodoCount />);

      const { result } = renderHookResult;

      // add todo
      act(() => result.current[1].addItem(todoItem));
      expect(container).toHaveTextContent("0 / 1");

      // toggle todo
      act(() => result.current[1].toggleItem(1))
      expect(container).toHaveTextContent("1 / 1");

      // remove todo
      act(() => result.current[1].removeItem(1))
      expect(container).toHaveTextContent("0 / 0");
    });
  });
});
