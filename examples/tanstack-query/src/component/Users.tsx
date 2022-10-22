import { useCallback, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../service";

export function Users() {
  const navigate = useNavigate();
  const [navLink, setNavLink] = useState("");
  const { data } = useQuery(["users"], getUsers, { suspense: true });

  const redirect = useCallback(
    () => navigate(navLink, { replace: true }),
    [navigate, navLink]
  );

  useEffect(() => {
    redirect();
  }, [redirect]);

  return (
    <ul>
      {data?.users.map((users) => (
        <li
          key={users.id}
          onClick={() => {
            setNavLink(`/user/${users.id}/todos`);
          }}
        >
          {users.name}
        </li>
      ))}
    </ul>
  );
}
