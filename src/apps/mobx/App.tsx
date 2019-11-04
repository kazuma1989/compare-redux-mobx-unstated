import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";
import { Header } from "./Header";
import * as NotificationListContainer from "./containers/NotificationList";
import * as NotificationDetailContainer from "./containers/NotificationDetail";

const notificationListContainer = new NotificationListContainer.Container();
const notificationDetailContainer = new NotificationDetailContainer.Container();

const pages = {
  Home: React.lazy(() => import("./pages/Home")),
  NotificationList: React.lazy(() => import("./pages/NotificationList")),
  NotificationDetail: React.lazy(() => import("./pages/NotificationDetail")),
  NotFound: React.lazy(() => import("./pages/NotFound"))
};

export function App() {
  return (
    <NotificationListContainer.Provider value={notificationListContainer}>
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
                value={notificationDetailContainer}
              >
                <pages.NotificationDetail id={match.params.id} />
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
