import {
  useRecoilValue,
  useSetRecoilState,
  selector,
  waitForNone,
} from "recoil";

import { currentUserIDState } from "./User";
import { userInfoQuery } from "./UserInfo";

const currentUserInfoQuery = selector({
  key: "CurrentUserInfoQuery",
  get: ({ get }) => get(userInfoQuery(get(currentUserIDState))),
});

const friendsInfoQuery = selector({
  key: "FriendsInfoQuery",
  get: ({ get }) => {
    const { friendList } = get(currentUserInfoQuery);

    // NOTE: waitForAll이 없으면, 차례차례 하나씩 가져오는데, Promise.all을 해준다.
    // const friends = get(waitForAll(friendList.map((id) => userInfoQuery(id))));
    // return friends;

    // NOTE: incremental updates to the UI with partial data
    const friendLoadables = get(
      waitForNone(friendList.map((friendID) => userInfoQuery(friendID)))
    );
    return friendLoadables
      .filter(({ state }) => state === "hasValue")
      .map(({ contents }) => contents);
  },
});

export function CurrentUserInfo() {
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);
  const setCurrentUserID = useSetRecoilState(currentUserIDState);

  return (
    <div>
      <h1>{currentUser.name}</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} onClick={() => setCurrentUserID(friend.id)}>
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
