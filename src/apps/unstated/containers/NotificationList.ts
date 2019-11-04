import { useState, useEffect } from "react";
import ky from "ky";
import produce from "immer";
import { createContainer } from "unstated-next";
import { TNotification } from "../../../types/TNotification";
import { TTransaction } from "../../../types/TTransaction";

export const NotificationListContainer = createContainer(useNotificationList);

export type TNotificationListHook = typeof useNotificationList;

function useNotificationList() {
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

  return {
    transaction,
    notificationList,

    markAsRead(id: string) {
      setState(state =>
        produce(state, draft => {
          const found = draft.notificationList.find(n => n.id === id);
          if (found) {
            found.read = true;
          }
        })
      );
    }
  };
}
