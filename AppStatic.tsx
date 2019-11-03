import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router";
import { Link } from "react-router-dom";

function Header({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="navbar is-link">
      <div className="container" style={{ display: "block" }}>
        <div className="navbar-brand" style={{ marginLeft: 0 }}>
          <Link to="/" className="navbar-item">
            Home
          </Link>

          <div style={{ flexGrow: 1 }}></div>

          {children}
        </div>
      </div>
    </nav>
  );
}

const HeaderNotification = withRouter(function HeaderNotification({ history }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(v => !v);

  useEffect(
    () =>
      history.listen(function close() {
        setIsOpen(false);
      }),
    [history]
  );

  return (
    <div className={`navbar-item has-dropdown ${isOpen ? "is-active" : ""}`}>
      <span className="navbar-link" onClick={toggleOpen}>
        <span className="icon is-large">
          <i className="mdi mdi-24px mdi-bell"></i>
        </span>
      </span>

      <div className="navbar-dropdown is-right">
        <Link to="/notifications/xxx" className="navbar-item">
          xxx
        </Link>
        <Link to="/notifications/yyy" className="navbar-item">
          yyy
        </Link>
        <Link to="/notifications/zzz" className="navbar-item">
          zzz
        </Link>

        <hr className="navbar-divider" />

        <Link to="/notifications" className="navbar-item">
          Show all notifications
        </Link>
      </div>
    </div>
  );
});

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
  return (
    <div>
      <Header>
        <HeaderNotification />
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
