import React from "react";
import { NotificationDetail } from "../../../components/NotificationDetail";
import { NotFound } from "../../../components/NotFound";
import { stubNotificationList } from "../stubNotificationList";

export default function NotificationDetailPage({ id }: { id: string }) {
  const notification = stubNotificationList.find(n => n.id === id);

  if (!notification) {
    return <NotFound />;
  }

  return <NotificationDetail notification={notification} />;
}
