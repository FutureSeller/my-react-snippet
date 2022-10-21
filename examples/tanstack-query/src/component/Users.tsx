import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../service";

export function Users() {
  const navigate = useNavigate();
  const { data } = useQuery(["users"], getUsers, { suspense: true });

  return (
    <ul>
      {data?.users.map((users) => (
        <li
          key={users.id}
          onClick={() => {
            navigate(`/user/${users.id}/todos`);
          }}
        >
          {users.name}
        </li>
      ))}
    </ul>
  );
}
