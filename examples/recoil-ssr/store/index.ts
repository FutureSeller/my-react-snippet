import { atom, selector, RecoilState } from "recoil";

/* 
  console에 에러가 찍힘
  NOTE: https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-729255961
*/
export const nameState = atom({
  key: "nameState",
  default: "",
});

export const charState = selector({
  key: "charState",
  get: ({ get }) => {
    const name = get(nameState);
    return name.length;
  },
});

export const AtomKeys = ["nameState"] as const;
type AtomKeyType = typeof AtomKeys[number];

export const isSSRAtomKeys = (key: string): key is AtomKeyType => {
  return AtomKeys.includes(key as AtomKeyType);
};

export type SSRAllAtoms = {
  [key in AtomKeyType]: RecoilState<any>;
};

export const ssrAllAtoms: SSRAllAtoms = {
  nameState,
};
