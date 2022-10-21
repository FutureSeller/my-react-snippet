import "./App.css";

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const UserListPage = lazy(() =>
  import("./pages/UserListPage").then(({ UserListPage }) => ({
    default: UserListPage,
  }))
);
const TodoListPage = lazy(() =>
  import("./pages/TodoListPage").then(({ TodoListPage }) => ({
    default: TodoListPage,
  }))
);

function App() {
  return (
    <div className="App">
      <h1 className="App__title">tanstack-query</h1>
      <hr />
      <Suspense fallback={<div>Page Loading...</div>}>
        <Routes>
          <Route path="/">
            <Route index element={<UserListPage />} />
            <Route path="/user/:userId/todos" element={<TodoListPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
