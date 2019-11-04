import React from "react";
import { useSelector } from "react-redux";
import { Header as InnerHeader } from "../../components/Header";
import { useContainer } from "./containers/NotificationList";

export function Header() {
  useContainer();

  const notificationList = useSelector(state => state.notificationList);

  return <InnerHeader logoText="Redux2" notificationList={notificationList} />;
}
