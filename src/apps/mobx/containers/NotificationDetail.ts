import ky from "ky";
import { observable, flow } from "mobx";
import { TNotificationDetail } from "../../../types/TNotification";
import { TTransaction } from "../../../types/TTransaction";

export class NotificationDetailContainer {
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
