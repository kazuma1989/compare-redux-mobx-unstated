import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Notification } from "../types/Notification";

export function Header({
  logoText,
  children: notification
}: {
  logoText: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(v => !v);

  const history = useHistory();
  const close = () => setIsOpen(false);
  useEffect(() => {
    const unlisten = history.listen(close);
    return unlisten;
  }, []);

  return (
    <nav className="navbar is-link">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <span className="icon">
              <i className="mdi mdi-24px mdi-home" />
            </span>
            &nbsp;&nbsp;
            {logoText}
          </Link>

          {/* only when mobile width */}
          <Burger isOpen={isOpen} onClick={toggleOpen} />
        </div>

        <div className={`navbar-menu ${isOpen ? "is-active" : ""}`}>
          <div className="navbar-end">{notification}</div>
        </div>
      </div>
    </nav>
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

export function HeaderNotification({
  isOpen,
  onClickArrow,
  notifications
}: {
  isOpen: boolean;
  onClickArrow(): unknown;
  notifications: Notification[];
}) {
  return (
    <div className={`navbar-item has-dropdown ${isOpen ? "is-active" : ""}`}>
      <span className="navbar-link" onClick={onClickArrow}>
        <span className="icon">
          <i className="mdi mdi-18px mdi-bell" />
        </span>
      </span>

      <div className="navbar-dropdown is-right">
        {notifications.map(({ id, read, title }) => (
          <Link key={id} to={`/notifications/${id}`} className="navbar-item">
            {read ? title : <strong>{title} **</strong>}
          </Link>
        ))}

        <hr className="navbar-divider" />

        <Link to="/notifications/" className="navbar-item">
          Show all notifications
        </Link>
      </div>
    </div>
  );
}
