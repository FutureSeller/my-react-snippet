# use-controllable-state

여러 디자인시스템 라이브러리들에서 사용되고 있는 훅이였다. 아래 문장이 핵심이다.

> It's also important to note that most Chakra components utilize an internal utility (useControllableState) for seamlessly managing regardless of whether it's controlled or uncontrolled

이 녀석이 controlled component이던, uncontrolled component이던 그냥 내부적으로 상태를 가지고 있겠다는 의미.

[이 예시](https://codesandbox.io/s/use-controlled-state-2zsst?file=/src/index.tsx)를 보면 잘 알 수 있다.

```jsx
function Collapsible({ isOpen = false, title, children, onChange }: Props) {
  const [isCollapbisleOpen, setIsCollapbisleOpen] = useControlledState(
    isOpen,
    onChange
  );

  return (
    <Wrapper>
      <Trigger onClick={() => setIsCollapbisleOpen(!isCollapbisleOpen)}>
        {title}
      </Trigger>
      {isCollapbisleOpen && children}
    </Wrapper>
  );
}

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="App">
      <h2>Controlled Collapsible</h2>
      <Collapsible
        title="This is a controlled collapbisle... click me!"
        isOpen={isOpen}
        onChange={(nextIsOpen) => setIsOpen(nextIsOpen)}
      >
        This is the controlled collapsible content
      </Collapsible>
      <br />
      <br />

      <h2>Uncontrolled Collapsible</h2>
      <Collapsible title="Uncontrolled collapsible... click me!">
        I'm now visible!
      </Collapsible>
    </div>
  );
}
```

- 첫번째 `Collapsible`엔 isOpen, onChange 둘 다 props로 넘어가는데 두번째 `Collapsible`엔 아무것도 넘어가지 않는다.
- 두 번째 `Collapsible`은 어떠한 상태와 setter도 없는데 collapse가 가능하다. 그 이유는 `uncontrolled state`로 두고 내부적으로 상태를 관리 한다는 것을 의미한다.
- 이름 그대로 두 번재 `Collapsible` 같이 `uncontrolled` 상태를 제어할 수 있게 만든 훅이다.

---

## Reference

- chakra-ui: https://github.com/chakra-ui/chakra-ui/issues/1008#issue-646788315
- radix-ui: https://github.com/radix-ui/primitives/blob/ea7e5e3f24bca5b059df80f54f2cd8535090c99e/packages/react/use-controllable-state/src/useControllableState.tsx
- example: https://codesandbox.io/s/use-controlled-state-2zsst?file=/src/index.tsx
