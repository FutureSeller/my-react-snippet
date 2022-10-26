import { atom, selector, AtomEffect } from "recoil";

/* 
  NOTE: AtomEffect;  https://recoiljs.org/ko/docs/guides/atom-effects/
  - side-effect를 관리할 때 주로 사용. 동기화, 히스토리 관리, 로깅 등등. 
  - effects 옵션을 통해 연결됨
  - useEffect는 리액트 컨텍스트 외부에서 생성되기때문에, atom의 side-effect를 컴포넌트내에서 관리하기 어려울 수 있음. (hmm. life cycle과 맞지않는다거나.)
*/

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export interface TodoItemType {
  id: string;
  text: string;
  isComplete: boolean;
}

export const todoListState = atom<TodoItemType[]>({
  key: "TodoList",
  default: [],
  effects: [localStorageEffect("todo_list")],
});

export const Filters = [
  "Show All",
  "Show Completed",
  "Show Uncompleted",
] as const;

export type FilterType = typeof Filters[number];

export const todoListFilterState = atom<FilterType>({
  key: "TodoListFilter",
  default: "Show All",
});

export const filteredTodoListState = selector({
  key: "FilteredTodoList",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: "TodoListStats",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
