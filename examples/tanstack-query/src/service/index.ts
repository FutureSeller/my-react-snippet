import { request } from "../utils/request";
import type { Todo, User } from "../mocks/data/todo";

export interface GetTodo {
  todos: Todo[];
}

export const getTodos = (id: number) => {
  return request.get<GetTodo>(`/api/todos?id=${id}`);
};

export interface GetUsers {
  users: User[];
}

export const getUsers = () => {
  const propbability = Math.random();
  if (propbability > 0.4) {
    throw new Error("Goto Error boundary");
  }

  return request.get<GetUsers>("/api/users");
};
