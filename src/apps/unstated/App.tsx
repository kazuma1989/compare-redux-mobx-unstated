import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";
import { Header } from "./Header";
import { NotificationsContainer } from "./containers/Notifications";
import { NotificationDetailContainer } from "./containers/NotificationDetail";

const pages = {
  Home: React.lazy(() => import("./pages/Home")),
  NotificationList: React.lazy(() => import("./pages/NotificationList")),
  NotificationDetail: React.lazy(() => import("./pages/NotificationDetail")),
  NotFound: React.lazy(() => import("./pages/NotFound"))
};

export function App() {
  return (
    <NotificationsContainer.Provider>
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
    </NotificationsContainer.Provider>
  );
}
