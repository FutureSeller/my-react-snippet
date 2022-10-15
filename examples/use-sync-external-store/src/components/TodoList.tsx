import { useTodoStore } from "../hooks/useTodoStore";

export function TodoList() {
  const [snapshot, todoStore] = useTodoStore();
  const { todos } = snapshot;

  if (todos.length < 1) {
    return <p>할일이 없어요!</p>;
  }

  return (
    <ul>
      {todos.map(({ id, title, isCompleted }) => (
        <li
          key={id}
          data-testid={id}
          onClick={() => todoStore.toggleItem(id)}
          style={{
            textDecoration: isCompleted ? "line-through" : "",
          }}
        >
          {title}
          <button aria-label="삭제" onClick={() => todoStore.removeItem(id)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
