import { request } from "../../utils/request";
import type { User } from "../../mocks/data/todo";

export interface GetUsers {
  users: User[];
}

export const getUsers = () => {
  return request.get<GetUsers>("/api/users");
};
