import React, { Suspense, useState, useEffect } from "react";
import { Route, Switch } from "react-router";
import ky from "ky";
import produce from "immer";
import { createContainer } from "unstated-next";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";
import { Header } from "./Header";
import { Notification } from "../../types/Notification";

function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    ky.get("http://localhost:8080/api/notifications/")
      .json()
      .then(data => setNotifications(data as Notification[]));
  }, []);

  return {
    notifications,

    markAsRead(index: number) {
      setNotifications(list =>
        produce(list, draft => {
          draft[index].read = true;
        })
      );
    }
  };
}

const {
  Provider: NotificationProvider,
  useContainer: useNotificationContainer
} = createContainer(useNotification);

const pages = {
  Home: React.lazy(() => import("./pages/Home")),
  NotificationList: React.lazy(() => import("./pages/NotificationList")),
  NotificationDetail: React.lazy(() => import("./pages/NotificationDetail")),
  NotFound: React.lazy(() => import("./pages/NotFound"))
};

export function App() {
  return (
    <div>
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
              <pages.NotificationDetail id={match.params.id} />
            )}
          />

          <Route>
            <pages.NotFound />
          </Route>
        </Switch>
      </Suspense>

      <Footer />
    </div>
  );
}
