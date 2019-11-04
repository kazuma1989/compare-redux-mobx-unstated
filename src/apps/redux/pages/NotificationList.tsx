import React from "react";
import { useSelector } from "react-redux";
import { NotificationList } from "../../../components/NotificationList";
import { Loading } from "../../../components/Loading";
import { NotFound } from "../../../components/NotFound";

export default function() {
  const [transaction, notificationList] = useSelector(state => [
    state.transaction.listAPI,
    state.notificationList
  ]);

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
}
