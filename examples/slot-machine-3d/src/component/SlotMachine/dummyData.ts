export const NAMES = [
  "강우규",
  "김구",
  "김규식",
  "김좌진",
  "김창숙",
  "민영환",
  "서재필",
  "손병희",
  "신익희",
  "쑨원",
  "쑹메이링",
  "안중근",
  "안창호",
  "오동진",
  "유관순",
  "윤봉길",
  "이강년",
  "이승만",
  "이승훈",
  "이시영",
  "이준",
  "임병직",
  "장제스",
  "조만식",
  "조병세",
  "조소앙",
  "천궈푸",
  "천치메이",
  "최익현",
  "한용운",
  "허위",
];

export const getLastChracters = (names: string[]) => {
  const lastCharacters = names.map((v) => v[v.length - 1]);
  return Array.from(new Set(lastCharacters).values());
};

export const getMiddleCharacters = (names: string[]) => {
  const lastCharacters = names.map((v) =>
    v.length > 2 ? v[v.length - 2] : "-"
  );
  return Array.from(new Set(lastCharacters).values());
};

export const getFirstCharacters = (names: string[]) => {
  const lastCharacters = names.map((v) => (v.length > 3 ? v[1] : v[0]));
  return Array.from(new Set(lastCharacters).values());
};
