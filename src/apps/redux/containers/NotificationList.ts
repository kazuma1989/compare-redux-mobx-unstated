import { useEffect } from "react";
import { useDispatch } from "react-redux";
import produce from "immer";
import ky from "ky";
import { TNotification } from "../../../types/TNotification";
import { TState } from "../State";

type TAction =
  | {
      type: "NotificationList.RUNNING";
    }
  | {
      type: "NotificationList.SUCCESS";
      payload: TNotification[];
    }
  | {
      type: "NotificationList.ERROR";
    };

export function useContainer() {
  const dispatch = useDispatch<TAction>();

  useEffect(() => {
    dispatch({
      type: "NotificationList.RUNNING"
    });

    ky.get(`http://localhost:3000/notifications/`)
      .json()
      .then(data =>
        dispatch({
          type: "NotificationList.SUCCESS",
          payload: data as TNotification[]
        })
      )
      .catch(err =>
        dispatch({
          type: "NotificationList.ERROR"
        })
      );
  }, []);
}

export const reducer = produce<(draft: TState, action: TAction) => void>(
  (draft, action) => {
    switch (action.type) {
      case "NotificationList.RUNNING": {
        draft.transaction.listAPI = "running";
        draft.notificationList = [];
        return;
      }

      case "NotificationList.SUCCESS": {
        draft.transaction.listAPI = "success";
        draft.notificationList = action.payload;
        return;
      }

      case "NotificationList.ERROR": {
        draft.transaction.listAPI = "error";
        draft.notificationList = [];
        return;
      }

      default: {
        const _: never = action;
      }
    }
  }
);
