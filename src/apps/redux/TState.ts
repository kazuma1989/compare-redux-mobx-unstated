import { TTransaction } from "../../types/TTransaction";
import { TNotificationDetail, TNotification } from "../../types/TNotification";

export type TState = {
  transaction: {
    listAPI: TTransaction;
    detailAPI: TTransaction;
  };
  notificationList: TNotification[];
  notificationDetail: TNotificationDetail | null;
};
