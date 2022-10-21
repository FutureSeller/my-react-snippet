import { rest } from "msw";
import { USERS, TODOS } from "./data/todo";

type GET_RESPONSE_TYPE = Parameters<typeof rest.get>[1];

const getUsers: GET_RESPONSE_TYPE = (_, res, ctx) => {
  return res(
    ctx.delay(2000),
    ctx.status(200),
    ctx.json({
      users: USERS,
    })
  );
};

const getTodos: GET_RESPONSE_TYPE = (req, res, ctx) => {
  const userId = req.url.searchParams.get("id");
  if (userId == null) {
    return res(ctx.status(400));
  }

  const todos = TODOS.filter((todo) => todo.userId === Number(userId));
  return res(
    ctx.delay(2000),
    ctx.status(200),
    ctx.json({
      todos,
    })
  );
};

export const handlers = [
  rest.get("/api/users", getUsers),
  rest.get("/api/todos", getTodos),
];
