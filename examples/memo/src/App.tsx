import "./App.css";

import { Routes, Route, NavLink, Outlet } from "react-router-dom";

import { BasicPage } from "./pages/BasicPage";

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
              memo
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1 className="App__title">memo: proof of concepts</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BasicPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
