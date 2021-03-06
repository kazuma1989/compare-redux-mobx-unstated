import React from "react";
import { useSelector } from "react-redux";
import { NotificationDetail } from "../../../components/NotificationDetail";
import { NotFound } from "../../../components/NotFound";
import { Loading } from "../../../components/Loading";
import { useContainer } from "../containers/NotificationDetail";

export default function({ id }: { id: string }) {
  useContainer(id);

  const [transaction, notification] = useSelector(state => [
    state.transaction.detailAPI,
    state.notificationDetail
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
