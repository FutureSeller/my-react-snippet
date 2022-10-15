export abstract class Store<T> {
  protected listeners: Set<() => void> = new Set();
  protected snaphot = {} as T;

  subscribe(listener: () => void) {
    this.listeners.add(listener);
  }

  unsubscribe(listener: () => void) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  getSnapshot() {
    return this.snaphot;
  }
}
