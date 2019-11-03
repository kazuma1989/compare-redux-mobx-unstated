import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";
import { Header } from "./Header";
import {
  Notifications as NotificationsContainer,
  reducer as notificationsReducer
} from "./containers/Notifications";
import {
  NotificationDetail as NotificationDetailContainer,
  reducer as notificationDetailReducer
} from "./containers/NotificationDetail";
import { State } from "./State";

type Reducer = (state: State, action: any) => State;
const reducers: Reducer[] = [notificationsReducer, notificationDetailReducer];

const store = createStore(function reducer(
  state: State = {
    transaction: {
      listAPI: "idle",
      detailAPI: "idle"
    },
    notifications: []
  },
  action: any
): State {
  return reducers.reduce((s, r) => r(s, action), state);
}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const pages = {
  Home: React.lazy(() => import("./pages/Home")),
  NotificationList: React.lazy(() => import("./pages/NotificationList")),
  NotificationDetail: React.lazy(() => import("./pages/NotificationDetail")),
  NotFound: React.lazy(() => import("./pages/NotFound"))
};

export function App() {
  return (
    <Provider store={store}>
      <NotificationsContainer />
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
    </Provider>
  );
}
