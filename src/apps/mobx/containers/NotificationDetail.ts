import { createContext, useContext } from "react";
import ky from "ky";
import { observable, flow } from "mobx";
import { TNotificationDetail } from "../../../types/TNotification";
import { TTransaction } from "../../../types/TTransaction";

const context = createContext<Container | null>(null);

export const Provider = context.Provider;

export function useContainer() {
  const container = useContext(context);
  if (!container) {
    throw new Error();
  }

  return container;
}

export class Container {
  @observable
  transaction: TTransaction = "idle";

  @observable
  notificationDetail: TNotificationDetail | null = null;

  fetchNotificationDetail = flow(this._fetchNotificationDetail);
  private *_fetchNotificationDetail(id: string) {
    this.transaction = "running";
    this.notificationDetail = null;

    try {
      const data: unknown = yield ky
        .patch(`http://localhost:3000/notifications/${id}`, {
          json: { read: true }
        })
        .json();

      this.notificationDetail = data as TNotificationDetail;
      this.transaction = "success";
    } catch (err) {
      this.notificationDetail = null;
      this.transaction = "error";
    }
  }
}
