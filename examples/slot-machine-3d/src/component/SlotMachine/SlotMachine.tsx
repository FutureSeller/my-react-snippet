import { Ring, RingContainer } from "./Ring";

import {
  NAMES,
  getFirstCharacters,
  getMiddleCharacters,
  getLastChracters,
} from "./dummyData";

const FIRST_CHAR = getFirstCharacters(NAMES);
const MIDDLE_CHAR = getMiddleCharacters(NAMES);
const LAST_CHAR = getLastChracters(NAMES);

interface Props {
  value: string;
  duration?: number;
  onAnimationEnd?: () => void;
}

export function SlotMachine({ value, duration = 1, onAnimationEnd }: Props) {
  return (
    <>
      <RingContainer>
        <Ring
          values={FIRST_CHAR}
          target={value ? FIRST_CHAR.indexOf(value[0]) : null}
          duration={duration + 2}
          onAnimationEnd={onAnimationEnd}
        />
      </RingContainer>
      <RingContainer>
        <Ring
          values={MIDDLE_CHAR}
          target={value ? MIDDLE_CHAR.indexOf(value[1]) : null}
          duration={duration + 1}
        />
      </RingContainer>
      <RingContainer>
        <Ring
          values={LAST_CHAR}
          target={value ? LAST_CHAR.indexOf(value[2]) : null}
          duration={duration}
        />
      </RingContainer>
    </>
  );
}
