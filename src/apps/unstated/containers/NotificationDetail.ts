import { useState, useEffect } from "react";
import ky from "ky";
import { createContainer } from "unstated-next";
import { NotificationDetail } from "../../../types/Notification";
import { TransactionStatus } from "../../../types/TransactionStatus";
import { NotificationsContainer } from "./Notifications";

export const NotificationDetailContainer = createContainer(
  useNotificationDetail
);

function useNotificationDetail(id: string) {
  const { markAsRead } = NotificationsContainer.useContainer();

  const [{ transaction, notification }, setState] = useState<{
    transaction: TransactionStatus;
    notification: NotificationDetail | null;
  }>({
    transaction: "idle",
    notification: null
  });

  useEffect(() => {
    setState({
      transaction: "running",
      notification: null
    });

    ky.patch(`http://localhost:3000/notifications/${id}`, {
      json: { read: true }
    })
      .json()
      .then(data => {
        markAsRead(id);
        setState({
          transaction: "success",
          notification: data as NotificationDetail
        });
      })
      .catch(err =>
        setState({
          transaction: "error",
          notification: null
        })
      );
  }, [id]);

  return {
    transaction,
    notification
  };
}
