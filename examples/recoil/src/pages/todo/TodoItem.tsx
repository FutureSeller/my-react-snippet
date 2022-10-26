import { useRecoilState } from "recoil";

import { todoListState, TodoItemType } from "./todoListState";

export function TodoItem({ item }: { item: TodoItemType }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  return (
    <div>
      <input
        type="text"
        value={item.text}
        onChange={({ target: { value } }) => {
          const newList = todoList.map((list) => {
            if (list.id === item.id) {
              return {
                ...list,
                text: value,
              };
            }
            return list;
          });

          setTodoList(newList);
        }}
      />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={() => {
          const newList = todoList.map((list) => {
            if (list.id === item.id) {
              return {
                ...list,
                isComplete: !list.isComplete,
              };
            }
            return list;
          });

          setTodoList(newList);
        }}
      />
      <button
        onClick={() => {
          const newList = todoList.filter((todo) => todo.id === item.id);

          setTodoList(newList);
        }}
      >
        X
      </button>
    </div>
  );
}
