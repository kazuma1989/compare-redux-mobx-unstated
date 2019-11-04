import React, { useState, useEffect } from "react";
import ky from "ky";
import { Header as InnerHeader } from "../../components/Header";
import { TTransaction } from "../../types/TTransaction";
import { TNotification } from "../../types/TNotification";

export function Header() {
  const [{ transaction, notificationList }, setState] = useState<{
    transaction: TTransaction;
    notificationList: TNotification[];
  }>({
    transaction: "idle",
    notificationList: []
  });

  useEffect(() => {
    setState({
      transaction: "running",
      notificationList: []
    });

    ky.get(`http://localhost:3000/notifications/`)
      .json()
      .then(data =>
        setState({
          transaction: "success",
          notificationList: data as TNotification[]
        })
      )
      .catch(err =>
        setState({
          transaction: "error",
          notificationList: []
        })
      );
  }, []);

  return <InnerHeader logoText="Static" notificationList={notificationList} />;
}
