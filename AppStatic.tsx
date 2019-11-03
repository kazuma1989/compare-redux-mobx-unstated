import React, { useState, useEffect, Suspense } from "react";
import { Route, Switch, useHistory } from "react-router";
import { Header, HeaderNotification } from "./Header";
import { Loading } from "./Loading";
import { Footer } from "./Footer";
import { Notification } from "./Notification";
import { Link } from "react-router-dom";

function ListPage({ notifications }: { notifications: Notification[] }) {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Notifications</h1>

        <div className="content">
          <ul>
            {notifications.map(({ id, read, title }) => (
              <li key={id}>
                <Link to={id}>
                  {read ? title : <strong>{title} **</strong>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function DetailPage({
  notification: { id, read, title, items }
}: {
  notification: Notification;
}) {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">{title}</h1>

        <div className="content">
          {items.map(({ type, body }, i) => {
            switch (type) {
              case "url":
                return (
                  <p key={i}>
                    <a href={body}>{body}</a>
                  </p>
                );

              case "caption":
                return <h3 key={i}>{body}</h3>;

              case "image":
                return (
                  <p key={i} className="image is-3by1">
                    <img src={body} />
                  </p>
                );

              case "text":
                return <p key={i}>{body}</p>;

              default:
                return null;
            }
          })}
        </div>
      </div>
    </section>
  );
}

export function AppStatic() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(v => !v);

  const history = useHistory();
  const close = () => setIsOpen(false);
  useEffect(() => {
    const unlisten = history.listen(close);
    return unlisten;
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
            <ListPage notifications={stubNotifications} />
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

              return <DetailPage notification={notification} />;
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

const NotFoundPage = React.lazy(() => import("./pages/NotFound"));

const stubNotifications: Notification[] = [
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
