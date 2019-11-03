import React from "react";
import { useSelector } from "react-redux";
import { Header as InnerHeader } from "../../components/Header";

export function Header() {
  const notifications = useSelector(state => state.notifications);

  return <InnerHeader logoText="Redux" notifications={notifications} />;
}
