import { useEffect } from "react";
import { useDispatch } from "react-redux";
import produce from "immer";
import ky from "ky";
import { Notification } from "../../../types/Notification";
import { State } from "../State";

export function useContainer() {
  const dispatch = useDispatch<Action>();

  useEffect(() => {
    dispatch({
      type: "Notifications.RUNNING"
    });

    ky.get(`http://localhost:3000/notifications/`)
      .json()
      .then(data =>
        dispatch({
          type: "Notifications.SUCCESS",
          payload: data as Notification[]
        })
      )
      .catch(err =>
        dispatch({
          type: "Notifications.ERROR"
        })
      );
  }, []);
}

type Action =
  | {
      type: "Notifications.RUNNING";
    }
  | {
      type: "Notifications.SUCCESS";
      payload: Notification[];
    }
  | {
      type: "Notifications.ERROR";
    };

export const reducer = produce<(draft: State, action: Action) => void>(
  (draft, action) => {
    switch (action.type) {
      case "Notifications.RUNNING": {
        draft.transaction.listAPI = "running";
        draft.notifications = [];
        return;
      }

      case "Notifications.SUCCESS": {
        draft.transaction.listAPI = "success";
        draft.notifications = action.payload.map(n => ({
          ...n,
          items: []
        }));
        return;
      }

      case "Notifications.ERROR": {
        draft.transaction.listAPI = "error";
        draft.notifications = [];
        return;
      }

      default: {
        const _: never = action;
      }
    }
  }
);
