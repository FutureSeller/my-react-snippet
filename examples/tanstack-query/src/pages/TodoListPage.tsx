import { Suspense } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import { Todos } from "../component/Todos";

export function TodoListPage() {
  const { reset } = useQueryErrorResetBoundary();
  const params = useParams();

  return (
    <div className="TodoListPage">
      <h2 className="TodoListPage__title">Todos - {params.userId}</h2>
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div>
            There was an error!{" "}
            <button onClick={() => resetErrorBoundary()}>Try again</button>
            <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
          </div>
        )}
      >
        <Suspense fallback={<div>Loading todos...</div>}>
          <Todos />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
