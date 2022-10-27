import { useRecoilValue } from "recoil";
import { nameState, charState } from "../store";

export function NameDisplay() {
  const name = useRecoilValue(nameState);
  const charName = useRecoilValue(charState);

  return (
    <div>
      <p>My name is {name}</p>
      <p>My name has {charName} characters</p>
    </div>
  );
}
