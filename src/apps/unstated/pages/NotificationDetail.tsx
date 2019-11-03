import React, { useEffect, useState } from "react";
import ky from "ky";
import { NotificationDetail as TNotificationDetail } from "../../../types/Notification";
import { NotificationDetail } from "../../../components/NotificationDetail";
import { NotFound } from "../../../components/NotFound";
import { TransactionStatus } from "../../../types/TransactionStatus";
import { Loading } from "../../../components/Loading";

export default function NotificationDetailPage({ id }: { id: string }) {
  const [{ transaction, notification }, setState] = useState<{
    transaction: TransactionStatus;
    notification: TNotificationDetail | null;
  }>({
    transaction: "idle",
    notification: null
  });

  useEffect(() => {
    setState({
      transaction: "running",
      notification: null
    });

    ky.get(`http://localhost:8080/api/notifications/${id}`)
      .json()
      .then(data =>
        setState({
          transaction: "success",
          notification: data as TNotificationDetail
        })
      )
      .catch(err =>
        setState({
          transaction: "error",
          notification: null
        })
      );
  }, [id]);

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
