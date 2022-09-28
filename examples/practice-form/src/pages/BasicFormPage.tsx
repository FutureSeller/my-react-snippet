import { NavLink, Outlet } from "react-router-dom";

export function BasicFormPage() {
  return (
    <div>
      <hr />
      <nav>
        <ul>
          <li>
            <NavLink
              to="/basic"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              controlled form with multiple states
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/basic/controlled"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              controlled Form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/basic/uncontrolled"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              uncontrolled form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/basic/uncontrolled-dynamic-refs"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              uncontrolled-dynamic-refs
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
