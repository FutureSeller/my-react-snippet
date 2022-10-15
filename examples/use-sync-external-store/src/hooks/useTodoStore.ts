import { useSyncExternalStore } from "react";

import { TodoStore } from "../store/TodoStore";

const todoStore = new TodoStore();

export function useTodoStore() {
  const snapshot = useSyncExternalStore(
    (onStoreChange) => {
      todoStore.subscribe(onStoreChange);
      return () => todoStore.unsubscribe(onStoreChange);
    },
    () => todoStore.getSnapshot()
  );

  return [snapshot, todoStore] as const;
}
