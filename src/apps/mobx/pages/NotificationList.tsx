import React from "react";
import { TNotification } from "../../../types/TNotification";
import { NotificationList } from "../../../components/NotificationList";
import { NotFound } from "../../../components/NotFound";
import { stubNotificationList } from "../stubNotificationList";

export default function() {
  const notificationList: TNotification[] = stubNotificationList.map(
    ({ id, read, title }) => ({ id, read, title })
  );

  if (!notificationList.length) {
    return <NotFound />;
  }

  return <NotificationList notificationList={notificationList} />;
}
