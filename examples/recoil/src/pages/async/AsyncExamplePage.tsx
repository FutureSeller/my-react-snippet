import { Suspense } from "react";

import { ErrorBoundary } from "../../component/ErrorBoundary";
import { server } from "../../mocks/browser";

import { User } from "./User";
import { UserInfo } from "./UserInfo";
import { CurrentUserInfo } from "./CurrentUserInfo";

server.start({ onUnhandledRequest: "bypass" });

export function AsyncExamplePage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <CurrentUserInfo />
        {/* <User /> */}
        {/* <UserInfo userID={1} />
        <UserInfo userID={2} />
        <UserInfo userID={3} /> */}
      </Suspense>
    </ErrorBoundary>
  );
}
