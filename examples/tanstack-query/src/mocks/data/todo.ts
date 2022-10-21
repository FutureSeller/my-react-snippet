export const USERS = [
  {
    id: 1,
    name: "common",
  },
  {
    id: 2,
    name: "fox",
  },
  {
    id: 3,
    name: "futureseller",
  },
  {
    id: 4,
    name: "solasido",
  },
];

export type User = typeof USERS[number];

export interface Todo {
  userId: number;
  id: number;
  title: string;
  isCompleted: boolean;
}

let todoId = 0;

const CommonTodo: Todo[] = "common".split("").map((character) => ({
  userId: 1,
  id: todoId++,
  title: character,
  isCompleted: false,
}));

const FoxTodo: Todo[] = "fox".split("").map((character) => ({
  userId: 2,
  id: todoId++,
  title: character,
  isCompleted: false,
}));

const FutureSellerTodo: Todo[] = "futureseller".split("").map((character) => ({
  userId: 3,
  id: todoId++,
  title: character,
  isCompleted: false,
}));

const SolasidoTodo: Todo[] = "solasido".split("").map((character) => ({
  userId: 4,
  id: todoId++,
  title: character,
  isCompleted: true,
}));

export const TODOS = [
  ...CommonTodo,
  ...FoxTodo,
  ...FutureSellerTodo,
  ...SolasidoTodo,
];
