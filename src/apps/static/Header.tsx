import React from "react";
import { Header as InnerHeader } from "../../components/Header";
import { TNotification } from "../../types/TNotification";
import { stubNotificationList } from "./stubNotificationList";

export function Header() {
  const notificationList: TNotification[] = stubNotificationList.map(n => ({
    id: n.id,
    title: n.title,
    read: n.read
  }));

  return <InnerHeader logoText="Static" notificationList={notificationList} />;
}
