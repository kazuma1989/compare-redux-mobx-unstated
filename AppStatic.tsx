import React, { useState } from "react";

function Header({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="navbar is-link">
      <div className="container" style={{ display: "block" }}>
        <div className="navbar-brand" style={{ marginLeft: 0 }}>
          <a href="/" className="navbar-item">
            Home
          </a>

          <div style={{ flexGrow: 1 }}></div>

          {children}
        </div>
      </div>
    </nav>
  );
}

function HeaderNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(v => !v);

  return (
    <div className={`navbar-item has-dropdown ${isOpen ? "is-active" : ""}`}>
      <span className="navbar-link" onClick={toggleOpen}>
        <span className="icon is-large">
          <i className="mdi mdi-24px mdi-bell"></i>
        </span>
      </span>

      <div className="navbar-dropdown is-right">
        <a className="navbar-item">Overview</a>
        <a className="navbar-item">Elements</a>
        <a className="navbar-item">Components</a>
        <hr className="navbar-divider" />
        <div className="navbar-item">Version 0.8.0</div>
      </div>
    </div>
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

      <ListPage />
      <DetailPage />

      <Footer />
    </div>
  );
}
