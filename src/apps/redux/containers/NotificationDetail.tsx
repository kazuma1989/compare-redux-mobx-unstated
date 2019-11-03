import { useEffect } from "react";
import { useDispatch } from "react-redux";
import produce from "immer";
import ky from "ky";
import { NotificationDetail } from "../../../types/Notification";
import { State } from "../State";

export function NotificationDetail({ id }: { id: string }) {
  const dispatch = useDispatch<Action>();

  useEffect(() => {
    dispatch({
      type: "NotificationDetail.RUNNING"
    });

    ky.get(`http://localhost:3000/notifications/${id}`)
      .json()
      .then(data =>
        dispatch({
          type: "NotificationDetail.SUCCESS",
          payload: data as NotificationDetail
        })
      )
      .catch(err =>
        dispatch({
          type: "NotificationDetail.ERROR"
        })
      );
  }, [id]);

  return null;
}

type Action =
  | {
      type: "NotificationDetail.RUNNING";
    }
  | {
      type: "NotificationDetail.SUCCESS";
      payload: NotificationDetail;
    }
  | {
      type: "NotificationDetail.ERROR";
    };

export const reducer = produce<(draft: State, action: Action) => void>(
  (draft, action) => {
    switch (action.type) {
      case "NotificationDetail.RUNNING": {
        draft.transaction.detailAPI = "running";
        return;
      }

      case "NotificationDetail.SUCCESS": {
        draft.transaction.detailAPI = "success";

        const detail = action.payload;
        const i = draft.notifications.findIndex(n => n.id === detail.id);
        if (i !== -1) {
          draft.notifications[i] = detail;
        }
        return;
      }

      case "NotificationDetail.ERROR": {
        draft.transaction.detailAPI = "error";
        return;
      }

      default: {
        const _: never = action;
      }
    }
  }
);
