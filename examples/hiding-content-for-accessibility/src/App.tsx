import "./App.css";

import { Routes, Route, Outlet, NavLink } from "react-router-dom";

import { TextIndentPage } from "./pages/TextIndentPage";
import { PositionAbsoluteAndCollapsedPage } from "./pages/PositionAbsoluteAndCollapsedPage";
import { PositionAbsoluteAndOffscreenPage } from "./pages/PositionAbsoluteAndOffscreenPage";
import { ClipMethodPage } from "./pages/ClipMethodPage";

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
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/text-indent"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              text-indent
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/absolute-collapsed"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              aboslute collapsed
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/absolute-offscreen"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              absolute offscreen
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clip-method"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              clip method
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
      <h1 className="App__title">Hiding content for accessibility</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <div style={{ marginTop: "40px" }}>
                <h2>???????????? ?????? ???????????? ????????? ?????????</h2>
                <p>
                  ????????? Voice Over??? ???????????? ?????????. Voice Over??? ?????? ?????????
                  [[fn + command + f5]]??????. ?????????????????? ??? ??????????????????
                  ????????????, ????????? ???????????? ???????????? ????????????.
                </p>
              </div>
            }
          />
          <Route path="/text-indent" element={<TextIndentPage />} />
          <Route
            path="/absolute-collapsed"
            element={<PositionAbsoluteAndCollapsedPage />}
          />
          <Route
            path="/absolute-offscreen"
            element={<PositionAbsoluteAndOffscreenPage />}
          />
          <Route path="/clip-method" element={<ClipMethodPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
