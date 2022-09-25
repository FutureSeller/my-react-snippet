import "./App.css";

import { Routes, Route, Outlet, NavLink } from "react-router-dom";

import { InfinitePost } from "./pages/InfinitePost";
import { LazyLoadImagePhoto } from "./pages/LazyLoadImagePhoto";

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
              Infinite Post List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/img-lazy-load"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              Image Lazy Loading
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
      <h1>Infinite Scroll</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InfinitePost />} />
          <Route path="/img-lazy-load" element={<LazyLoadImagePhoto />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
