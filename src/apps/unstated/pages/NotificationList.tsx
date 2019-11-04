import React from "react";
import { NotificationList } from "../../../components/NotificationList";
import { Loading } from "../../../components/Loading";
import { NotFound } from "../../../components/NotFound";
import { NotificationsContainer } from "../containers/Notifications";

export default function() {
  const {
    transaction,
    notificationList
  } = NotificationsContainer.useContainer();

  if (!notificationList.length) {
    switch (transaction) {
      case "idle":
      case "running":
        return <Loading />;

      case "error":
      default:
        return <NotFound />;
    }
  }

  return <NotificationList notificationList={notificationList} />;
}
