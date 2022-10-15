import { Store } from "./Store";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface TodoStoreSnapshot {
  todos: Todo[];
}

export class TodoStore extends Store<TodoStoreSnapshot> {
  todoList: Todo[] = [];

  constructor() {
    super();
    this.initSnapshot();
  }

  addItem(todoItem: Todo) {
    this.todoList = [...this.todoList, todoItem];
    this.takeSnapshot();
    this.publish();
  }

  toggleItem(id: number) {
    this.todoList = this.todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    this.takeSnapshot();
    this.publish();
  }

  removeItem(id: number) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    this.takeSnapshot();
    this.publish();
  }

  private takeSnapshot() {
    this.snaphot = {
      todos: this.todoList,
    };
  }

  private initSnapshot() {
    this.snaphot = {
      todos: [],
    };
  }
}
