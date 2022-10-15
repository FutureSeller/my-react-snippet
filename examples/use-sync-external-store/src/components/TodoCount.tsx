import { useTodoStore } from "../hooks/useTodoStore";

export function TodoCount() {
  const [snapshot] = useTodoStore();
  const { todos } = snapshot;

  return (
    <div>
      {todos.filter((todo) => todo.isCompleted).length} / {todos.length}
    </div>
  );
}
