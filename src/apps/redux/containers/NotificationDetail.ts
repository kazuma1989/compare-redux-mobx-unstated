import { useEffect } from "react";
import { useDispatch } from "react-redux";
import produce from "immer";
import ky from "ky";
import { TNotificationDetail } from "../../../types/TNotification";
import { TState } from "../TState";

type TAction =
  | {
      type: "NotificationDetail.RUNNING";
    }
  | {
      type: "NotificationDetail.SUCCESS";
      payload: TNotificationDetail;
    }
  | {
      type: "NotificationDetail.ERROR";
    };

export function useContainer(id: string) {
  const dispatch = useDispatch<TAction>();

  useEffect(() => {
    dispatch({
      type: "NotificationDetail.RUNNING"
    });

    ky.patch(`http://localhost:3000/notifications/${id}`, {
      json: { read: true }
    })
      .json()
      .then(data =>
        dispatch({
          type: "NotificationDetail.SUCCESS",
          payload: data as TNotificationDetail
        })
      )
      .catch(err =>
        dispatch({
          type: "NotificationDetail.ERROR"
        })
      );
  }, [id]);
}

export const reducer = produce<(draft: TState, action: TAction) => void>(
  (draft, action) => {
    switch (action.type) {
      case "NotificationDetail.RUNNING": {
        draft.transaction.detailAPI = "running";
        return;
      }

      case "NotificationDetail.SUCCESS": {
        draft.transaction.detailAPI = "success";

        const detail = action.payload;
        const i = draft.notificationList.findIndex(n => n.id === detail.id);
        if (i !== -1) {
          draft.notificationList[i] = detail;
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
