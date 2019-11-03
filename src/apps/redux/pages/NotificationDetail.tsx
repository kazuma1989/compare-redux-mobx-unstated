import React from "react";
import { useSelector } from "react-redux";
import { NotificationDetail } from "../../../components/NotificationDetail";
import { NotFound } from "../../../components/NotFound";
import { Loading } from "../../../components/Loading";
import * as NotificationDetailContainer from "../containers/NotificationDetail";

export default function NotificationDetailPage({ id }: { id: string }) {
  NotificationDetailContainer.useContainer(id);

  const [transaction, notification] = useSelector(state => [
    state.transaction.detailAPI,
    state.notifications.find(n => n.id === id)
  ]);

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
}
