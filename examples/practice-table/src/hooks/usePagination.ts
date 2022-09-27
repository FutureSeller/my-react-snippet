import { useReducer, useCallback, useEffect } from "react";

type PaginationState = {
  page: number;
  perPage: number;
  totalPages: number;
};

type PageActions =
  | { type: "GOTO_PREV_PAGE" }
  | { type: "GOTO_NEXT_PAGE" }
  | { type: "GOTO_FIRST_PAGE" }
  | { type: "GOTO_LAST_PAGE" }
  | { type: "SET_TOTAL_ITEMS"; payload: { totalPages: number } }
  | { type: "SET_PAGE"; payload: { nextPage: number } }
  | {
      type: "SET_PER_PAGE";
      payload: { nextPerPage: number; nextPage: number };
    };

const paginateReducer = (state: PaginationState, actions: PageActions) => {
  switch (actions.type) {
    case "GOTO_NEXT_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    case "GOTO_PREV_PAGE":
      return {
        ...state,
        page: state.page - 1,
      };
    case "GOTO_FIRST_PAGE":
      return {
        ...state,
        page: 1,
      };
    case "GOTO_LAST_PAGE":
      console.log(state, state.totalPages);
      return {
        ...state,
        page: state.totalPages,
      };
    case "SET_TOTAL_ITEMS":
      return {
        ...state,
        totalPages: actions.payload.totalPages,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: actions.payload.nextPage,
      };
    case "SET_PER_PAGE":
      return {
        ...state,
        perPage: actions.payload.nextPerPage,
      };
    default:
      return state;
  }
};

export function usePagination({
  initialPage = 1,
  initialPerPage = 10,
  initialItemLength,
}: {
  initialPage?: number;
  initialPerPage?: number;
  initialItemLength: number;
}) {
  const initialState: PaginationState = {
    page: initialPage,
    perPage: initialPerPage,
    totalPages: initialItemLength,
  };

  const [paginationState, dispatch] = useReducer(paginateReducer, initialState);

  const onPrevPage = useCallback(() => {
    dispatch({ type: "GOTO_PREV_PAGE" });
  }, []);

  const onNextPage = useCallback(() => {
    dispatch({ type: "GOTO_NEXT_PAGE" });
  }, []);

  const onFirstPage = useCallback(() => {
    dispatch({ type: "GOTO_FIRST_PAGE" });
  }, []);

  const onLastPage = useCallback(() => {
    dispatch({ type: "GOTO_LAST_PAGE" });
  }, []);

  const onUpdatePage = useCallback(
    ({ payload }: Extract<PageActions, { type: "SET_PAGE" }>) => {
      dispatch({ type: "SET_PAGE", payload });
    },
    []
  );

  const onUpdatePerPage = useCallback(
    ({ payload }: Extract<PageActions, { type: "SET_PER_PAGE" }>) => {
      dispatch({ type: "SET_PER_PAGE", payload });
    },
    []
  );

  useEffect(() => {
    dispatch({
      type: "SET_TOTAL_ITEMS",
      payload: {
        totalPages: Math.ceil(initialItemLength / paginationState.perPage),
      },
    });
  }, []);

  return {
    ...paginationState,
    onPrevPage,
    onNextPage,
    onFirstPage,
    onLastPage,
    onUpdatePage,
    onUpdatePerPage,
  };
}

export type UsePaginationProps = Parameters<typeof usePagination>[0];
export type UsePaginationReturnType = ReturnType<typeof usePagination>;
