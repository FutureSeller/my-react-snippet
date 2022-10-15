import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

import { TodoForm } from "./TodoForm";

test("TodoForm", () => {
  const { container } = render(<TodoForm />);

  const inputNode = container.querySelector("input")!;
  expect(inputNode).toHaveAttribute("type", "text");
  expect(inputNode).toHaveAttribute("name", "todoInput");

  fireEvent.change(inputNode, { target: { value: "할일 추가" } });
  expect(inputNode.value).toEqual("할일 추가");
});
