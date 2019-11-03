import { NotificationDetail } from "../../types/Notification";
import { TransactionStatus } from "../../types/TransactionStatus";

export type State = {
  transaction: {
    listAPI: TransactionStatus;
    detailAPI: TransactionStatus;
  };
  notifications: NotificationDetail[];
};
