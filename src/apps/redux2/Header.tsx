import React from "react";
import { useSelector } from "react-redux";
import { Header as InnerHeader } from "../../components/Header";

export function Header() {
  const notificationList = useSelector(state => state.notificationList);

  return <InnerHeader logoText="Redux2" notificationList={notificationList} />;
}
