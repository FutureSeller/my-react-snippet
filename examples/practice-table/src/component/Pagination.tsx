import { HTMLAttributes } from "react";

import { UsePaginationReturnType } from "../hooks/usePagination";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {}

export function Pagination({
  page,
  perPage,
  totalPages,
  onFirstPage,
  onPrevPage,
  onNextPage,
  onLastPage,
  ...rest
}: PaginationProps & Partial<UsePaginationReturnType>) {
  return (
    <div {...rest}>
      <button onClick={onFirstPage} disabled={page === 1}>
        {"<<"}
      </button>
      <button onClick={onPrevPage} disabled={page === 1}>
        {"<"}
      </button>
      <button>
        {page} / {totalPages}
      </button>
      <button onClick={onNextPage} disabled={page === totalPages}>
        {">"}
      </button>
      <button onClick={onLastPage} disabled={page === totalPages}>
        {">>"}
      </button>
    </div>
  );
}
