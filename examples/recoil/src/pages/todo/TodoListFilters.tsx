import { useRecoilState } from "recoil";

import { todoListFilterState, FilterType } from "./todoListState";

export function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  return (
    <>
      Filter:
      <select
        value={filter}
        onChange={({ target: { value } }) => {
          setFilter(value as FilterType);
        }}
      >
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}
