import { useRecoilValue, selectorFamily } from "recoil";

import { getUsers } from "./service";

// selectorFamily: 읽기 전용 Value, 혹은 RecoilState selector를 반환함.
// get, set, selector의 콜백을 매개변수로 전달할 수 있음.
export const userInfoQuery = selectorFamily({
  key: "UserName",
  get: (userID: number) => async () => {
    const response = await getUsers();

    const result = response.users.filter((user) => user.id === userID);
    if (result.length < 1) {
      throw new Error("wow");
    }

    return result[0];
  },
});

export function UserInfo({ userID }: { userID: number }) {
  const userName = useRecoilValue(userInfoQuery(userID));
  return <div>{userName.name}</div>;
}
