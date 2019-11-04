import React from "react";
import { Link } from "react-router-dom";
import { TNotification } from "../types/TNotification";

export function NotificationList({
  notifications
}: {
  notifications: TNotification[];
}) {
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
