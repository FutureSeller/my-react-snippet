import { describe, it, expect, vi } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";

import App from "./App";
import * as service from "./service";
import { server } from "./mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "bypass" });
});
afterAll(() => {
  server.close();
});

let queryCache: QueryCache | null;
let queryClient: QueryClient | null;

describe("App", () => {
  beforeAll(() => {
    vi.useFakeTimers();

    queryCache = new QueryCache();
    queryClient = new QueryClient({
      queryCache,
      defaultOptions: { queries: { retry: 0, suspense: true } },
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();

    queryCache = null;
    queryClient = null;
  });

  const spyOnGetUsers = vi.spyOn(service, "getUsers");
  const spyOnGetTodos = vi.spyOn(service, "getTodos");

  it("타이틀 -> UserList - > TodoList 가 보이나요?", async () => {
    const { getByText } = renderWithRouter(
      <QueryClientProvider client={queryClient!}>
        <App />
      </QueryClientProvider>,
      { route: "/" }
    );

    expect(await screen.findByText("tanstack-query")).toBeInTheDocument();
    expect(await screen.findByText("Loading users...")).toBeInTheDocument();
    expect(spyOnGetUsers).toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const lazyUserElement = await waitFor(() => getByText(/common/));
    expect(lazyUserElement).toBeInTheDocument();

    fireEvent.click(lazyUserElement);

    expect(await screen.findByText(/Todos/)).toBeInTheDocument();
    expect(spyOnGetTodos).toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const lazyTodoElement = await waitFor(() => getByText("c"));
    expect(lazyTodoElement).toBeInTheDocument();
  });

  function renderWithRouter(
    Component: React.ReactElement,
    options: { route: string }
  ) {
    return render(
      <MemoryRouter initialEntries={[options.route]}>{Component}</MemoryRouter>
    );
  }
});
