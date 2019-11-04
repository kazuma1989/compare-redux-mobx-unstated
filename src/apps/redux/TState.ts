import { TNotificationDetail } from "../../types/TNotification";
import { TTransaction } from "../../types/TTransaction";

export type TState = {
  transaction: {
    listAPI: TTransaction;
    detailAPI: TTransaction;
  };
  notifications: TNotificationDetail[];
};
