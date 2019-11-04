import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";
import { Header } from "./Header";
import * as NotificationList from "./containers/NotificationList";
import * as NotificationDetail from "./containers/NotificationDetail";

class NotificationListContainer extends NotificationList.Container {
  constructor() {
    super();

    this.transaction = "success";
    this.notificationList = [
      {
        id: "aaa",
        read: false,
        title: "aaa is an AAA"
      }
    ];
    this.fetchNotificationList = () => null as any;
  }
}

class NotificationDetailContainer extends NotificationDetail.Container {
  constructor(notificationListContainer) {
    super(notificationListContainer);

    this.transaction = "success";
    this.notificationDetail = {
      id: "aaa",
      read: false,
      title: "aaa is an AAA",
      items: [{ type: "text", body: "text is a part of the document" }]
    };
    this.fetchNotificationDetail = () => null as any;
  }
}

const notificationListContainer = new NotificationListContainer();
const notificationDetailContainer = new NotificationDetailContainer(
  notificationListContainer
);

const pages = {
  Home: React.lazy(() => import("./pages/Home")),
  NotificationList: React.lazy(() => import("./pages/NotificationList")),
  NotificationDetail: React.lazy(() => import("./pages/NotificationDetail")),
  NotFound: React.lazy(() => import("./pages/NotFound"))
};

export function App() {
  return (
    <NotificationList.Provider value={notificationListContainer}>
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
              <NotificationDetail.Provider value={notificationDetailContainer}>
                <pages.NotificationDetail id={match.params.id} />
              </NotificationDetail.Provider>
            )}
          />

          <Route>
            <pages.NotFound />
          </Route>
        </Switch>
      </Suspense>

      <Footer />
    </NotificationList.Provider>
  );
}
