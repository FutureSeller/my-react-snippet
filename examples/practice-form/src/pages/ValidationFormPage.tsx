import { NavLink, Outlet } from "react-router-dom";

export function ValidationFormPage() {
  return (
    <div>
      <hr />
      <nav>
        <ul>
          <li>
            <NavLink
              to="/validation"
              style={({ isActive }) =>
                isActive ? { color: "red", fontWeight: 900 } : { opacity: 0.8 }
              }
              end
            >
              manual validation
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
