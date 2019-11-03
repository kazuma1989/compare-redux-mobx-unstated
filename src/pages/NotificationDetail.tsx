import React from "react";
import { NotificationDetail } from "../types/Notification";

export default function NotificationDetail({
  notification: { id, read, title, items }
}: {
  notification: NotificationDetail;
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
