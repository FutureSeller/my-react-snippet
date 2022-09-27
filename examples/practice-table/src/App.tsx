import "./App.css";

import { useMemo } from "react";

import { Table } from "./component/Table";
import { Pagination, DEFAULT_PER_PAGE } from "./component/Pagination";
import { createData } from "./data";
import { paginate } from "./utils/paginate";

import type { TableModel } from "@h6s/table";
import type { Person } from "./data";
import { usePagination } from "./hooks/usePagination";

const MODEL: TableModel<Person> = [
  { accessor: "_id", label: "Id" },
  { accessor: "firstName", label: "firstName" },
  { accessor: "lastName", label: "lastName" },
  { accessor: "age", label: "age" },
  { accessor: "visits", label: "visits" },
  { accessor: "progress", label: "progress" },
  { accessor: "status", label: "status" },
];
const DEFAULT_SOURCE_LENGTH = 10000;
const SOURCE = createData(DEFAULT_SOURCE_LENGTH);

function App() {
  const {
    page,
    perPage,
    totalPages,
    onNextPage,
    onPrevPage,
    onFirstPage,
    onLastPage,
  } = usePagination({
    initialItemLength: SOURCE.length,
  });
  const data = useMemo(() => paginate(SOURCE, page, perPage), [page, perPage]);

  return (
    <div className="App">
      <h1 className="App__title">callback Refs vs. useRef</h1>
      <div>
        <Table model={MODEL} source={data} />
        <Pagination
          style={{ display: "flex", gap: "8px", marginTop: "20px" }}
          page={page}
          perPage={DEFAULT_PER_PAGE}
          totalPages={totalPages}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          onFirstPage={onFirstPage}
          onLastPage={onLastPage}
        />
      </div>
    </div>
  );
}

export default App;
