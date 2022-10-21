import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getTodos } from "../service";

export function Todos() {
  const params = useParams();

  const { data } = useQuery(
    ["users", params.userId],
    () => getTodos(Number(params.userId)),
    {
      suspense: true,
    }
  );

  return (
    <ul>
      {data?.todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
