import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";
import { Header } from "./Header";
import * as NotificationListContainer from "./containers/NotificationList";
import { TState } from "./State";

const bypass = state => state;
const stateForCatalog: TState = {
  transaction: {
    listAPI: "success",
    detailAPI: "success"
  },
  notificationList: [
    {
      id: "aaa",
      read: false,
      title: "aaa is an AAA"
    }
  ],
  notificationDetail: {
    id: "aaa",
    read: false,
    title: "aaa is an AAA",
    items: [{ type: "text", body: "text is a part of the document" }]
  }
};

const store = createStore(
  bypass,
  stateForCatalog,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const pages = {
  Home: React.lazy(() => import("./pages/Home")),
  NotificationList: React.lazy(() => import("./pages/NotificationList")),
  NotificationDetail: React.lazy(() => import("./pages/NotificationDetail")),
  NotFound: React.lazy(() => import("./pages/NotFound"))
};

function InnerApp() {
  NotificationListContainer.useContainer();

  return (
    <>
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
    </>
  );
}

export function App() {
  return (
    <Provider store={store}>
      <InnerApp />
    </Provider>
  );
}
