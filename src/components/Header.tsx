import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { TNotification } from "../types/TNotification";

export function Header({
  logoText,
  notificationList
}: {
  logoText: string;
  notificationList: TNotification[];
}) {
  const bell = useOpenableState();
  const burger = useOpenableState();

  useHistoryListener(() => {
    bell.close();
    burger.close();
  });

  return (
    <nav className="navbar is-link">
      <div className="container">
        <div className="navbar-brand">
          <LogoItem text={logoText} />

          {/* only when mobile width */}
          <Burger isOpen={burger.isOpen} onClick={burger.toggle} />
        </div>

        <div className={`navbar-menu ${burger.isOpen ? "is-active" : ""}`}>
          <div className="navbar-end">
            <div
              className={`navbar-item has-dropdown ${
                bell.isOpen ? "is-active" : ""
              }`}
            >
              <span className="navbar-link" onClick={bell.toggle}>
                <span className="icon">
                  <i className="mdi mdi-18px mdi-bell" />
                </span>
              </span>

              <Dropdown notificationList={notificationList} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function useOpenableState() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(v => !v);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    toggle,
    close
  };
}

function useHistoryListener(listener: () => unknown) {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(listener);
    return unlisten;
  }, []);
}

function LogoItem({ text }: { text: string }) {
  return (
    <Link to="/" className="navbar-item">
      <span className="icon">
        <i className="mdi mdi-24px mdi-home" />
      </span>
      &nbsp;&nbsp;
      {text}
    </Link>
  );
}

function Burger({ isOpen, onClick }: { isOpen: boolean; onClick(): unknown }) {
  return (
    <div
      className={`navbar-burger ${isOpen ? "is-active" : ""}`}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </div>
  );
}

function Dropdown({ notificationList }: { notificationList: TNotification[] }) {
  return (
    <div className="navbar-dropdown is-right">
      {notificationList.map(({ id, read, title }) => (
        <Link key={id} to={`/notifications/${id}`} className="navbar-item">
          {read ? title : <strong>{title} **</strong>}
        </Link>
      ))}

      <hr className="navbar-divider" />

      <Link to="/notifications/" className="navbar-item">
        Show all notifications
      </Link>
    </div>
  );
}
