import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { createContainer } from "unstated-next";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";
import { Header } from "./Header";
import { TNotificationListHook } from "./containers/NotificationList";
import { NotificationDetailContainer } from "./containers/NotificationDetail";

const stubListHook: TNotificationListHook = () => ({
  transaction: "success",
  notificationList: [
    {
      id: "aaa",
      read: false,
      title: "aaa is an AAA"
    }
  ],
  markAsRead() {}
});
const NotificationListContainer = createContainer(stubListHook);

const pages = {
  Home: React.lazy(() => import("./pages/Home")),
  NotificationList: React.lazy(() => import("./pages/NotificationList")),
  NotificationDetail: React.lazy(() => import("./pages/NotificationDetail")),
  NotFound: React.lazy(() => import("./pages/NotFound"))
};

export function App() {
  return (
    <NotificationListContainer.Provider>
      <Header />

      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/">
            <pages.Home />
          </Route>

          <Route exact path="/notifications/">
            <pages.NotificationList />
          </Route>

          <Route
            exact
            path="/notifications/:id"
            render={({ match }) => (
              <NotificationDetailContainer.Provider
                initialState={match.params.id}
              >
                <pages.NotificationDetail />
              </NotificationDetailContainer.Provider>
            )}
          />

          <Route>
            <pages.NotFound />
          </Route>
        </Switch>
      </Suspense>

      <Footer />
    </NotificationListContainer.Provider>
  );
}
