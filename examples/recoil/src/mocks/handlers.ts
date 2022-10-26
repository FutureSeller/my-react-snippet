import { rest } from "msw";
import { USERS } from "./data/todo";

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

export const handlers = [rest.get("/api/users", getUsers)];
