import "./App.css";

import { Routes, Route, NavLink, Outlet } from "react-router-dom";

import { BasicPage } from "./pages/BasicPage";
import { BatchingCounterPage } from "./pages/BatchingCounterPage";
import { FunctionalUpdatesPage } from "./pages/FunctionalUpdatesPage";
import { DerivedStatePage } from "./pages/DerivedStatePage";

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
              useState
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/batching"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              batched example
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/functional-update"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              functional-update example
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/derived"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              derived state
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
      <h1 className="App__title">useState proof of concepts</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BasicPage />} />
          <Route path="/batching" element={<BatchingCounterPage />} />
          <Route
            path="/functional-update"
            element={<FunctionalUpdatesPage />}
          />
          <Route path="/derived" element={<DerivedStatePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
