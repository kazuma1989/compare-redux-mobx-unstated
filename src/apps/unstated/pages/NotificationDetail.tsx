import React from "react";
import { NotificationDetail } from "../../../components/NotificationDetail";
import { NotFound } from "../../../components/NotFound";
import { Loading } from "../../../components/Loading";
import { NotificationDetailContainer } from "../containers/NotificationDetail";

export default function() {
  const {
    transaction,
    notification
  } = NotificationDetailContainer.useContainer();

  if (!notification) {
    switch (transaction) {
      case "idle":
      case "running":
        return <Loading />;

      case "error":
      default:
        return <NotFound />;
    }
  }

  return <NotificationDetail notification={notification} />;
}
