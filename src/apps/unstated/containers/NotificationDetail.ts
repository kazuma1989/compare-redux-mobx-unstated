import { useState, useEffect } from "react";
import ky from "ky";
// import produce from "immer";
import { createContainer } from "unstated-next";
import { NotificationDetail } from "../../../types/Notification";
import { TransactionStatus } from "../../../types/TransactionStatus";

export const NotificationDetailContainer = createContainer(
  useNotificationDetail
);

function useNotificationDetail(id: string) {
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

    ky.get(`http://localhost:3000/notifications/${id}`)
      .json()
      .then(data =>
        setState({
          transaction: "success",
          notification: data as NotificationDetail
        })
      )
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
    // markAsRead(index: number) {
    //   setNotifications(list =>
    //     produce(list, draft => {
    //       draft[index].read = true;
    //     })
    //   );
    // }
  };
}
