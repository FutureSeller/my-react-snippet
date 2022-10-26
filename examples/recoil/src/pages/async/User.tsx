import { atom, selector, useRecoilValue } from "recoil";

import { getUsers } from "./service";

export const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 1,
});

export const currentUserNameState = selector({
  key: "CurrentUserName",
  get: async ({ get }) => {
    const response = await getUsers();
    if (Math.random() > 0.5) {
      throw new Error("holy moly");
    }

    return response.users[get(currentUserIDState)].name;
  },
});

export function User() {
  const userName = useRecoilValue(currentUserNameState);
  return <div>{userName}</div>;
}
