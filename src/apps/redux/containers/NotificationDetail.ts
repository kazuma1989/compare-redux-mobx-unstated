import { useEffect } from "react";
import { useDispatch } from "react-redux";
import produce from "immer";
import ky from "ky";
import { TNotificationDetail } from "../../../types/TNotification";
import { TState } from "../State";

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
        draft.notificationDetail = null;
        return;
      }

      case "NotificationDetail.SUCCESS": {
        const detail = action.payload;

        draft.transaction.detailAPI = "success";
        draft.notificationDetail = detail;

        const notification = draft.notificationList.find(
          n => n.id === detail.id
        );
        if (notification) {
          notification.read = true;
        }
        return;
      }

      case "NotificationDetail.ERROR": {
        draft.transaction.detailAPI = "error";
        draft.notificationDetail = null;
        return;
      }

      default: {
        const _: never = action;
      }
    }
  }
);
