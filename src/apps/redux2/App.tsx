import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";
import { Header } from "./Header";
import { TState, initialState } from "./State";
import { storeEnhancer } from "./storeEnhancer";

type TReducer = (state: TState, action: any) => TState;
const reducer: TReducer = (state = initialState, action) => state;

const store = createStore(reducer, storeEnhancer);

const pages = {
  Home: React.lazy(() => import("./pages/Home")),
  NotificationList: React.lazy(() => import("./pages/NotificationList")),
  NotificationDetail: React.lazy(() => import("./pages/NotificationDetail")),
  NotFound: React.lazy(() => import("./pages/NotFound"))
};

export function App() {
  return (
    <Provider store={store}>
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
