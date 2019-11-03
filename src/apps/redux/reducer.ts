import { NotificationDetail } from "../../types/Notification";
import { TransactionStatus } from "../../types/TransactionStatus";
import { reducer as notificationsReducer } from "./containers/Notifications";
import { reducer as notificationDetailReducer } from "./containers/NotificationDetail";

export type State = {
  transaction: {
    listAPI: TransactionStatus;
    detailAPI: TransactionStatus;
  };
  notifications: NotificationDetail[];
};

type Reducer = (state: State, action: any) => State;

const reducers: Reducer[] = [notificationsReducer, notificationDetailReducer];

export function reducer(
  state: State = {
    transaction: {
      listAPI: "idle",
      detailAPI: "idle"
    },
    notifications: []
  },
  action: any
): State {
  return reducers.reduce((s, r) => r(s, action), state);
}
