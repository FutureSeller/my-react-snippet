import "./App.css";

import { Routes, Route, Outlet, NavLink } from "react-router-dom";

import { BasicFormPage } from "./pages/BasicFormPage";
import { BasicControlledFormWithMultipleStates } from "./component/BasicControlledFormWithMultipleStates";
import { BasicControlledForm } from "./component/BasicControlledForm";
import { BasicUncontrolledForm } from "./component/BasicUncontrolledForm";
import { BasicDynamicRefsForm } from "./component/BasicDynamicRefsForm";
import { CardForm } from "./component/cardform";

import { ValidationFormPage } from "./pages/ValidationFormPage";
import { ValidateManuallyForm } from "./component/ValidateManuallyForm";

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
              to="/basic"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
            >
              Basic usage of form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/validation"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
            >
              validate form controls
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cardform"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
            >
              card form
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
      <h1 className="App__title">Form Examples</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <hr />
                hello world
              </>
            }
          />
          <Route path="basic" element={<BasicFormPage />}>
            <Route index element={<BasicControlledFormWithMultipleStates />} />
            <Route path="controlled" element={<BasicControlledForm />} />
            <Route path="uncontrolled" element={<BasicUncontrolledForm />} />
            <Route
              path="uncontrolled-dynamic-refs"
              element={<BasicDynamicRefsForm />}
            />
          </Route>
          <Route path="validation" element={<ValidationFormPage />}>
            <Route index element={<ValidateManuallyForm />} />
          </Route>
          <Route path="cardform" element={<CardForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
