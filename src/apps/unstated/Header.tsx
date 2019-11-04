import React from "react";
import { Header as InnerHeader } from "../../components/Header";
import { NotificationsContainer } from "./containers/Notifications";

export function Header() {
  const { notificationList } = NotificationsContainer.useContainer();

  return (
    <InnerHeader logoText="unstated-next" notificationList={notificationList} />
  );
}
