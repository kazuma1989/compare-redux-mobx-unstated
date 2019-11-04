import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { NotificationDetail } from "../../../components/NotificationDetail";
import { NotFound } from "../../../components/NotFound";
import { Loading } from "../../../components/Loading";
import { useContainer } from "../containers/NotificationDetail";

export default observer(function({ id }: { id: string }) {
  const container = useContainer();

  useEffect(() => {
    container.fetchNotificationDetail(id);
  }, [id]);

  const { transaction, notificationDetail: notification } = container;

  if (!notification) {
    switch (transaction) {
      case "idle":
      case "running":
        return <Loading />;

      case "error":
      default:
        return <NotFound />;
    }
  }

  return <NotificationDetail notification={notification} />;
});
