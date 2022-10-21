import { Suspense } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Users } from "../component/Users";

export function UserListPage() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div className="UserListPage">
      <h2 className="UserListPage__title">Users</h2>
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
        <Suspense fallback={<div>Loading users...</div>}>
          <Users />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
