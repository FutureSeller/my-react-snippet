import "./App.css";

import { Routes, Route, Outlet, NavLink } from "react-router-dom";

import { TodoExamplePage } from "./pages/todo/TodoExamplePage";
import { AsyncExamplePage } from "./pages/async/AsyncExamplePage";

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              Index
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/async"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
            >
              Async
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1 className="App__title">recoil</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TodoExamplePage />} />
          <Route path="/async" element={<AsyncExamplePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
