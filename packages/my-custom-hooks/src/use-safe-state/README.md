# useSafeState

> Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

위와 같은 에러를 심심치 않게 볼 수 있다. 컴포넌트가 Unmounted 된 후에 setState를 불러서 발생하는 현상이다.
몇몇 라이브러리들에서 custom 훅을 제공하고 있는데, 아래 코드를 작성해서 실행시켜보았는데 재현되지 않았다.

```jsx
import { useEffect, useRef, useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { useSafeState } from "my-custom-hooks";

const ChildUseState = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setValue("data loaded from server");
    }, 5000);
  }, [value]);

  console.log(value);

  return value ? <div>{value}</div> : null;
};

const ChildUseSafeState = () => {
  const [value, setValue] = useSafeState("");

  useEffect(() => {
    setTimeout(() => {
      setValue("data loaded from server");
    }, 5000);
  }, []);

  return <div>{value || "Loading..."}</div>;
};

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="App">
      <h1 className="App__title">callback Refs vs. useRef</h1>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">home</Link>
                  </li>
                  <li>
                    <Link to="/safe">safe</Link>
                  </li>
                </ul>
              </nav>
              <Outlet />
            </div>
          }
        >
          <Route
            index
            element={
              <div>
                <button onClick={() => setVisible(false)}>Unmount</button>
                {visible && <ChildUseState />}
              </div>
            }
          />
          <Route
            path="safe"
            element={
              <div>
                <button onClick={() => setVisible(false)}>Unmount</button>
                {visible && <ChildUseSafeState />}
              </div>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
```

왜 발생하지 않는 문제를 해결하려고 하지? 싶어서 React 공식레포를 찾아보니 [이와 같은 announcement](https://github.com/reactwg/react-18/discussions/82)가 있었다.
한줄로 요약하자면 unmounted된 컴포넌트에서 setState 호출 시 발생하는 warning을 제거했다는 뜻이다.
리액트 팀이 의도했던 것은 unmounted될 때 unsubcribe를 까먹었을 때 메모리 leak이 발생할 수 있다인데, 대개 우리가 사용하는 경우는 promise가 완료되기 전에 페이지를 전환했다던가 등이다.

Dan이 warning은 지워져도 된다는 의견은 아래와 같다.

- promise가 resolve 될 거고 GC에 의해 수집될 것
- promise가 resolve 되지 않는다면 저 액션 자체가 실행되지 않을 것
