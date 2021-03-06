import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";
import { Header } from "./Header";
import * as NotificationList from "./containers/NotificationList";
import * as NotificationDetail from "./containers/NotificationDetail";

const notificationListContainer = new NotificationList.Container();
const notificationDetailContainer = new NotificationDetail.Container(
  notificationListContainer
);

notificationListContainer.transaction = "success";
notificationListContainer.notificationList = [
  {
    id: "aaa",
    read: false,
    title: "aaa is an AAA"
  }
];
notificationListContainer.fetchNotificationList = () => null as any;

notificationDetailContainer.transaction = "success";
notificationDetailContainer.notificationDetail = {
  id: "aaa",
  read: false,
  title: "aaa is an AAA",
  items: [{ type: "text", body: "text is a part of the document" }]
};
notificationDetailContainer.fetchNotificationDetail = () => null as any;

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
