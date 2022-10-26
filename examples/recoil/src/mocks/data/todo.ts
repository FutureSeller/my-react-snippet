export const USERS = [
  {
    id: 1,
    name: "common",
    friendList: [2],
  },
  {
    id: 2,
    name: "fox",
    friendList: [1, 3],
  },
  {
    id: 3,
    name: "futureseller",
    friendList: [2, 4],
  },
  {
    id: 4,
    name: "solasido",
    friendList: [3],
  },
];

export type User = typeof USERS[number];
