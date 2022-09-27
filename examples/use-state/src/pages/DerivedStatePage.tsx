import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  initialColor: string;
}

interface DerivedStateWithAlternativePropsButton extends ButtonProps {
  prevPropsID: number;
}

/**
 * Reference: https://reactjs.org/docs/react-component.html#constructor 의 Note를 보면.
 *
 * 그냥 color props를 사용하면 되는데, state에 담았고 props가 변경되었지만 state가 변경되지 않았기 때문에 발생.
 * 역으로 생각해보면 의도적으로 props 갱신을 무시해야할 때 사용. 필요에따라 'key'를 변경하면 초기 state를 재설정하도록 강세할 수 있음
 *
 * Question 1:
 *    key를 변경하면 새로운 component 인스턴스를 만들 텐데, 초기 state에 필요한 initialize하기 비싼 작업이라면 어떻게하나?
 *    https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
 */
function MisuseDerivedStateButton({ initialColor, ...rest }: ButtonProps) {
  const [misuseDerivedColorState] = useState(() => {
    console.log("[MisuseDerivedStateButton] : suuuper expensive job");
    return initialColor;
  });

  return (
    <button {...rest} style={{ color: misuseDerivedColorState }}>
      key가 바뀌지 않는 이상 컬러가 바뀌지 않을걸?
    </button>
  );
}

/**
 * https://ko.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#alternative-1-reset-uncontrolled-component-with-an-id-prop
 *
 * Question 1에 대한 해답: Reset uncontrolled component with an ID prop
 *
 * 다른 props를 가지고 useEffect + setState를 부르면된다. useState의 초기 상태를 가져오는 함수는 실행하지 않으면서 상태를 업데이트 할 수 있음. 근데, 이런 usecase가 많을지 모르겠음.
 */
function DerivedStateWithAlternativePropsButton({
  initialColor,
  prevPropsID,
  ...rest
}: DerivedStateWithAlternativePropsButton) {
  const [misuseDerivedColorState, setMisuseDerivedColorState] = useState(() => {
    console.log(
      "[DerivedStateWithAlternativePropsButton] : suuuper expensive job"
    );
    return initialColor;
  });

  useEffect(() => {
    setMisuseDerivedColorState(initialColor);
  }, [prevPropsID]);

  return (
    <button {...rest} style={{ color: misuseDerivedColorState }}>
      key가 바뀌지 않는 이상 컬러가 바뀌지 않을걸?
    </button>
  );
}

/**
  useImperativeHandle을 사용해서 바꿀수도 있긴하다.
  - ref를 사용할 때 부모 컴포넌트에 노출되는 인스턴스 값을 자식 컴포넌트가 반환하는 것으로 커스텀된다는 의미.
 */
type DerivedImperativeHandle = {
  resetColorForNewUser: (color: string) => void;
};

const DerivedStateWithAlternative2PropsButton = forwardRef<
  DerivedImperativeHandle,
  ButtonProps
>(({ initialColor, ...rest }, ref) => {
  const [misuseDerivedColorState, setMisuseDerivedColorState] = useState(() => {
    console.log(
      "[DerivedStateWithAlternativePropsButton] : suuuper expensive job"
    );
    return initialColor;
  });

  useImperativeHandle(ref, () => ({
    resetColorForNewUser: (color: string) => {
      setMisuseDerivedColorState(color);
    },
  }));

  return (
    <button {...rest} style={{ color: misuseDerivedColorState }}>
      ImperativeHandle으로 상태 변경
    </button>
  );
});
DerivedStateWithAlternative2PropsButton.displayName =
  "DerivedStateWithAlternative2PropsButton";

export function DerivedStatePage() {
  const [count, setCount] = useState(0);
  const buttonRef = useRef<React.ElementRef<
    typeof DerivedStateWithAlternative2PropsButton
  > | null>(null);

  return (
    <div>
      <div>
        <MisuseDerivedStateButton
          key={count % 4 === 0 ? `updated-${count}` : `update`}
          initialColor={count % 2 === 0 ? "yellow" : "white"}
          onClick={() => {
            setCount((prevCount) => prevCount + 1);
          }}
        />
      </div>
      <div>
        <DerivedStateWithAlternativePropsButton
          prevPropsID={count % 4 === 0 ? 1 : 0}
          initialColor={count % 2 === 0 ? "yellow" : "white"}
          onClick={() => {
            setCount((prevCount) => prevCount + 1);
          }}
        />
      </div>
      <div>
        <DerivedStateWithAlternative2PropsButton
          ref={buttonRef}
          initialColor={count % 2 === 0 ? "yellow" : "white"}
          onClick={() => {
            setCount((prevCount) => prevCount + 1);
          }}
        />
        <button
          onClick={() => {
            if (buttonRef.current) {
              buttonRef.current.resetColorForNewUser("purple");
            }
          }}
        >
          보라색
        </button>
      </div>
    </div>
  );
}
