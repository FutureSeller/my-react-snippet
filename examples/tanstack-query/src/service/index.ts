import { request } from "../utils/request";
import type { Todo, User } from "../mocks/data/todo";

export interface GetTodo {
  todos: Todo[];
}

export const getTodos = (userId: number) => {
  return request.get<GetTodo>(`/api/todos?id=${userId}`);
};

export interface GetUsers {
  users: User[];
}

export const getUsers = () => {
  return request.get<GetUsers>("/api/users");
};
