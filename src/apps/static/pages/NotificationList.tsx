import React, { useState, useEffect } from "react";
import ky from "ky";
import { Notification } from "../../../types/Notification";
import { TransactionStatus } from "../../../types/TransactionStatus";
import { NotificationList } from "../../../components/NotificationList";
import { Loading } from "../../../components/Loading";
import { NotFound } from "../../../components/NotFound";

export default function NotificationListPage() {
  const [{ transaction, notifications }, setState] = useState<{
    transaction: TransactionStatus;
    notifications: Notification[];
  }>({
    transaction: "idle",
    notifications: []
  });

  useEffect(() => {
    setState({
      transaction: "running",
      notifications: []
    });

    ky.get(`http://localhost:3000/notifications/`)
      .json()
      .then(data =>
        setState({
          transaction: "success",
          notifications: data as Notification[]
        })
      )
      .catch(err =>
        setState({
          transaction: "error",
          notifications: []
        })
      );
  }, []);

  if (!notifications.length) {
    switch (transaction) {
      case "idle":
      case "running":
        return <Loading />;

      case "error":
      default:
        return <NotFound />;
    }
  }

  return <NotificationList notifications={notifications} />;
}
