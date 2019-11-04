import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Header as InnerHeader } from "../../components/Header";
import { useContainer } from "./containers/NotificationList";

export const Header = observer(function Header() {
  const container = useContainer();

  useEffect(() => {
    container.fetchNotificationList();
  }, []);

  const { notificationList } = container;

  return <InnerHeader logoText="MobX" notificationList={notificationList} />;
});
