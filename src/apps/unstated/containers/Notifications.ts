import { useState, useEffect } from "react";
import ky from "ky";
import produce from "immer";
import { createContainer } from "unstated-next";
import { TNotification } from "../../../types/TNotification";
import { TTransaction } from "../../../types/TTransaction";

export const NotificationsContainer = createContainer(useNotifications);

function useNotifications() {
  const [{ transaction, notifications }, setState] = useState<{
    transaction: TTransaction;
    notifications: TNotification[];
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
          notifications: data as TNotification[]
        })
      )
      .catch(err =>
        setState({
          transaction: "error",
          notifications: []
        })
      );
  }, []);

  return {
    transaction,
    notifications,

    markAsRead(id: string) {
      setState(state =>
        produce(state, draft => {
          const found = draft.notifications.find(n => n.id === id);
          if (found) {
            found.read = true;
          }
        })
      );
    }
  };
}
