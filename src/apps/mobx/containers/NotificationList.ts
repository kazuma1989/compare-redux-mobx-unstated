import ky from "ky";
import { observable, flow, action } from "mobx";
import { TNotification } from "../../../types/TNotification";
import { TTransaction } from "../../../types/TTransaction";

export class NotificationListContainer {
  @observable
  transaction: TTransaction = "idle";

  @observable
  notificationList: TNotification[] = [];

  fetchNotificationList = flow(this._fetchNotificationList);
  private *_fetchNotificationList() {
    this.transaction = "running";
    this.notificationList = [];

    try {
      const data: unknown = yield ky
        .get(`http://localhost:3000/notifications/`)
        .json();

      this.notificationList = data as TNotification[];
      this.transaction = "success";
    } catch (err) {
      this.notificationList = [];
      this.transaction = "error";
    }
  }

  @action
  markAsRead(id: string) {
    const found = this.notificationList.find(n => n.id === id);
    if (found) {
      found.read = true;
    }
  }
}
