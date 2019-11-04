import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { NotificationList } from "../../../components/NotificationList";
import { NotFound } from "../../../components/NotFound";
import { Loading } from "../../../components/Loading";
import { NotificationListContainer } from "../containers/NotificationList";

const container = new NotificationListContainer();

export default observer(function() {
  useEffect(() => {
    container.fetchNotificationList();
  }, []);

  const { transaction, notificationList } = container;

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
});
