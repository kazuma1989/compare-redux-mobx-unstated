import { useState, useEffect } from "react";
import ky from "ky";
import { createContainer } from "unstated-next";
import { TNotificationDetail } from "../../../types/TNotification";
import { TTransaction } from "../../../types/TTransaction";
import { NotificationListContainer } from "./NotificationList";

export const NotificationDetailContainer = createContainer(
  useNotificationDetail
);

function useNotificationDetail(id: string) {
  const { markAsRead } = NotificationListContainer.useContainer();

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

    ky.patch(`http://localhost:3000/notifications/${id}`, {
      json: { read: true }
    })
      .json()
      .then(data => {
        markAsRead(id);
        setState({
          transaction: "success",
          notification: data as TNotificationDetail
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
