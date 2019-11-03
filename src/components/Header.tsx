import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Notification } from "../types/Notification";

export function Header({
  logoText,
  isOpen,
  onClickArrow,
  notifications
}: {
  logoText: string;
  isOpen: boolean;
  onClickArrow(): unknown;
  notifications: Notification[];
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const toggleOpen = () => setIsOpenMenu(v => !v);

  const history = useHistory();
  const closeMenu = () => setIsOpenMenu(false);
  useEffect(() => {
    const unlisten = history.listen(closeMenu);
    return unlisten;
  }, []);

  return (
    <nav className="navbar is-link">
      <div className="container">
        <div className="navbar-brand">
          <LogoItem text={logoText} />

          {/* only when mobile width */}
          <Burger isOpen={isOpenMenu} onClick={toggleOpen} />
        </div>

        <div className={`navbar-menu ${isOpenMenu ? "is-active" : ""}`}>
          <div className="navbar-end">
            <div
              className={`navbar-item has-dropdown ${
                isOpen ? "is-active" : ""
              }`}
            >
              <span className="navbar-link" onClick={onClickArrow}>
                <span className="icon">
                  <i className="mdi mdi-18px mdi-bell" />
                </span>
              </span>

              <Dropdown notifications={notifications} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
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

function Dropdown({ notifications }: { notifications: Notification[] }) {
  return (
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
  );
}
