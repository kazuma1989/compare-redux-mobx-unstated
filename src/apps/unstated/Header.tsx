import React from "react";
import { Header as InnerHeader } from "../../components/Header";
import { NotificationListContainer } from "./containers/NotificationList";

export function Header() {
  const { notificationList } = NotificationListContainer.useContainer();

  return (
    <InnerHeader logoText="unstated-next" notificationList={notificationList} />
  );
}
