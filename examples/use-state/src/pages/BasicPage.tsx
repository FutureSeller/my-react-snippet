import { HR } from "../components/HR";
import { CodeExample } from "../components/CodeExample";

const basicCodeExample = `
  const [state, setState] = useState(initialState);
`;

const lazyInitCodeExample = `
  const [state, setState] = useState(() => {
    const initialState = superExpensiveComputation(props)
    return initialState
  });
`;

export function BasicPage() {
  return (
    <div>
      <HR />
      <div>
        <h2>useState Basic</h2>
        <div>
          <CodeExample>{basicCodeExample}</CodeExample>
        </div>
        <ol>
          <li>
            상태 유지하는 값 `state`와 갱신하는 함수인 `setState`를 반환한다.
          </li>
          <li>최초 렌더링 시, state는 initialState의 값과 같다.</li>
          <li>새 state 값을 받아 컴포넌트 리렌더링을 큐에 등록한다.</li>
          <li>
            다음 리렌더링 시, 변경된 useState를 통해 반환 받은 `state`는 갱신된
            값을 가진다.
          </li>
          <li>
            setState는 컴포넌트의 state 에 대한 업데이트를 실행하고, 변경되면
            컴포넌트는 리렌더링 된다.
          </li>
          <li>
            {" "}
            <a
              href="https://ko.reactjs.org/docs/hooks-reference.html#usestate"
              target="_blank"
              rel="noopener noreferrer"
            >
              참고
            </a>
          </li>
        </ol>
      </div>
      <HR />
      <div>
        <h2>지연 초기 state</h2>
        <CodeExample>{lazyInitCodeExample}</CodeExample>
        <ul>
          <li>
            초기 렌더링 될 때만 useState에 넘긴 함수가 실행되고, 리렌더링 될
            때는 실행되지 않는다.
          </li>
          <li>
            초기 렌더링 때 복잡한 연산을 수행하고 향후 업데이트때는 관여하지
            않음으로 리렌더링 시 퍼포먼스 이득을 취함
          </li>
          <li>
            <a
              href="https://reactjs.org/docs/hooks-reference.html#lazy-initial-state"
              target="_blank"
              rel="noopener noreferrer"
            >
              참고
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
