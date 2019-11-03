import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";
import { Header, HeaderNotification } from "./Header";

function HomePage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Home</h1>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Not Found</h1>
      </div>
    </section>
  );
}

function ListPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Notifications</h1>

        <div className="content">
          <ul>
            <li>x</li>
            <li>x</li>
            <li>x</li>
            <li>x</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function DetailPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Title</h1>

        <div className="content">
          <p className="image is-3by1">
            <img src="https://via.placeholder.com/600x200.png" />
          </p>

          <p>hello[</p>
          <p>hello[</p>
          <p>hello[</p>
          <p>hello[</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Created by <a href="https://github.com/kazuma1989">kazuma1989</a>
        </p>
      </div>
    </footer>
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
          notifications={[
            { id: "xxx", read: false, title: "title", body: "body" },
            { id: "yyy", read: false, title: "title", body: "body" },
            { id: "zzz", read: false, title: "title", body: "body" }
          ]}
        />
      </Header>

      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/notifications">
          <ListPage />
        </Route>
        <Route exact path="/notifications/:id">
          <DetailPage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}
