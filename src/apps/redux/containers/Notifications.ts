import { useEffect } from "react";
import { useDispatch } from "react-redux";
import produce from "immer";
import ky from "ky";
import { TNotification } from "../../../types/TNotification";
import { TState } from "../TState";

type TAction =
  | {
      type: "Notifications.RUNNING";
    }
  | {
      type: "Notifications.SUCCESS";
      payload: TNotification[];
    }
  | {
      type: "Notifications.ERROR";
    };

export function useContainer() {
  const dispatch = useDispatch<TAction>();

  useEffect(() => {
    dispatch({
      type: "Notifications.RUNNING"
    });

    ky.get(`http://localhost:3000/notifications/`)
      .json()
      .then(data =>
        dispatch({
          type: "Notifications.SUCCESS",
          payload: data as TNotification[]
        })
      )
      .catch(err =>
        dispatch({
          type: "Notifications.ERROR"
        })
      );
  }, []);
}

export const reducer = produce<(draft: TState, action: TAction) => void>(
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
