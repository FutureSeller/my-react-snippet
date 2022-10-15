import { TodoStore } from "./TodoStore";

import { todos } from "../fixture/todo";

describe("TodoStore", () => {
  let todoStore: TodoStore;
  const [todoItem] = todos;

  beforeEach(() => {
    todoStore = new TodoStore();
  });

  test("add todo item", () => {
    todoStore.addItem(todoItem);

    expect(todoStore.getSnapshot()).toEqual({
      todos: [todoItem],
    });
  });

  test("toggle todo item", () => {
    todoStore.addItem(todoItem);
    todoStore.toggleItem(1);

    expect(todoStore.getSnapshot()).toEqual({
      todos: [{ ...todoItem, isCompleted: true }],
    });

    todoStore.toggleItem(1);
    expect(todoStore.getSnapshot()).toEqual({
      todos: [todoItem],
    });
  });

  test("toggle todo item", () => {
    todoStore.addItem(todoItem);
    todoStore.removeItem(1);

    expect(todoStore.getSnapshot()).toEqual({
      todos: [],
    });
  });
});
