import { useRecoilState } from "recoil";

import { fontSizeState } from "../store/fontSize";

export function Text() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return <p style={{ fontSize }}>This text will increase in size too.</p>;
}
