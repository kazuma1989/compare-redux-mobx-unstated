import React, { useState, useEffect } from "react";
import ky from "ky";
import { Header as InnerHeader } from "../../components/Header";
import { TransactionStatus } from "../../types/TransactionStatus";
import { Notification } from "../../types/Notification";

export function Header() {
  const [{ transaction, notifications }, setState] = useState<{
    transaction: TransactionStatus;
    notifications: Notification[];
  }>({
    transaction: "idle",
    notifications: []
  });

  useEffect(() => {
    setState({
      transaction: "running",
      notifications: []
    });

    ky.get(`http://localhost:3000/notifications/`)
      .json()
      .then(data =>
        setState({
          transaction: "success",
          notifications: data as Notification[]
        })
      )
      .catch(err =>
        setState({
          transaction: "error",
          notifications: []
        })
      );
  }, []);

  return <InnerHeader logoText="Static" notifications={notifications} />;
}
