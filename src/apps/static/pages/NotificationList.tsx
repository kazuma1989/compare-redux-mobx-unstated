import React, { useState, useEffect } from "react";
import ky from "ky";
import { TNotification } from "../../../types/TNotification";
import { TTransaction } from "../../../types/TTransaction";
import { NotificationList } from "../../../components/NotificationList";
import { Loading } from "../../../components/Loading";
import { NotFound } from "../../../components/NotFound";

export default function NotificationListPage() {
  const [{ transaction, notificationList }, setState] = useState<{
    transaction: TTransaction;
    notificationList: TNotification[];
  }>({
    transaction: "idle",
    notificationList: []
  });

  useEffect(() => {
    setState({
      transaction: "running",
      notificationList: []
    });

    ky.get(`http://localhost:3000/notifications/`)
      .json()
      .then(data =>
        setState({
          transaction: "success",
          notificationList: data as TNotification[]
        })
      )
      .catch(err =>
        setState({
          transaction: "error",
          notificationList: []
        })
      );
  }, []);

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
