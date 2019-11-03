import React, { useState, useEffect, Suspense } from "react";
import { Route, Switch, useHistory } from "react-router";
import ky from "ky";
import { Header, HeaderNotification } from "./Header";
import { Loading } from "./Loading";
import { Footer } from "./Footer";
import { Notification, NotificationDetail } from "./Notification";

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
      <Header>
        <HeaderNotification
          isOpen={isOpen}
          onClickArrow={toggleOpen}
          notifications={stubNotifications}
        />
      </Header>

      <Suspense fallback={<Loading />}>
        <Switch>
          <Route
            exact
            path="/"
            component={React.lazy(() => import("./pages/Home"))}
          />

          <Route exact path="/notifications/">
            <NotificationListPage notifications={notifications} />
          </Route>

          <Route
            exact
            path="/notifications/:id"
            render={({ match }) => {
              const notification = stubNotifications.find(
                n => n.id === match.params.id
              );
              if (!notification) {
                return <NotFoundPage />;
              }

              return <NotificationDetailPage notification={notification} />;
            }}
          />

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>

      <Footer />
    </div>
  );
}

const NotificationListPage = React.lazy(() =>
  import("./pages/NotificationList")
);
const NotificationDetailPage = React.lazy(() =>
  import("./pages/NotificationDetail")
);

const NotFoundPage = React.lazy(() => import("./pages/NotFound"));

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
