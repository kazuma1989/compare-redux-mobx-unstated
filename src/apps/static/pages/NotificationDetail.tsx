import React, { useEffect, useState } from "react";
import ky from "ky";
import { TNotificationDetail } from "../../../types/TNotification";
import { NotificationDetail } from "../../../components/NotificationDetail";
import { NotFound } from "../../../components/NotFound";
import { TTransaction } from "../../../types/TTransaction";
import { Loading } from "../../../components/Loading";

export default function NotificationDetailPage({ id }: { id: string }) {
  const [{ transaction, notification }, setState] = useState<{
    transaction: TTransaction;
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

    ky.get(`http://localhost:3000/notifications/${id}`)
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
