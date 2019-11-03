import React, { useState, useEffect, Suspense } from "react";
import { Route, Switch, useHistory } from "react-router";
import ky from "ky";
import { Header, HeaderNotification } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { Footer } from "../../components/Footer";
import { Notification, NotificationDetail } from "../../types/Notification";

const pages = {
  Home: React.lazy(() => import("./pages/Home")),
  NotificationList: React.lazy(() => import("./pages/NotificationList")),
  NotificationDetail: React.lazy(() => import("./pages/NotificationDetail")),
  NotFound: React.lazy(() => import("./pages/NotFound"))
};

export function AppStatic() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(v => !v);

  const history = useHistory();
  const close = () => setIsOpen(false);
  useEffect(() => {
    const unlisten = history.listen(close);
    return unlisten;
  }, []);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    ky.get("http://localhost:8080/api/notifications/")
      .json()
      .then(data => setNotifications(data as Notification[]));
  }, []);

  return (
    <div>
      <Header logoText="Static">
        <HeaderNotification
          isOpen={isOpen}
          onClickArrow={toggleOpen}
          notifications={stubNotifications}
        />
      </Header>

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

const stubNotifications: NotificationDetail[] = [
  {
    id: "xxx",
    read: false,
    title: "The title",
    items: [
      {
        type: "image",
        body: "https://via.placeholder.com/600x200.png"
      },
      {
        type: "url",
        body: "https://via.placeholder.com/600x200.png"
      },
      {
        type: "caption",
        body: "The caption"
      },
      {
        type: "text",
        body: "Lorem ipsum"
      }
    ]
  },
  {
    id: "yyy",
    read: true,
    title: "The title",
    items: [
      {
        type: "caption",
        body: "The caption"
      },
      {
        type: "text",
        body: "Lorem ipsum"
      }
    ]
  },
  {
    id: "zzz",
    read: false,
    title: "The title",
    items: [
      {
        type: "text",
        body: "Lorem ipsum"
      },
      {
        type: "text",
        body: "Lorem ipsum, dolor"
      }
    ]
  }
];
