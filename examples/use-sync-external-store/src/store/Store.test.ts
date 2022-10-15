import { Store } from "./Store";

class DummyStore extends Store<{ dummy: number[] }> {}

test("Store", () => {
  const store = new DummyStore();
  const listener = jest.fn();

  store.subscribe(listener);
  store.publish();

  expect(listener).toHaveBeenCalled();

  store.unsubscribe(listener);
  store.publish();

  expect(listener).toHaveBeenCalledTimes(1);
});
