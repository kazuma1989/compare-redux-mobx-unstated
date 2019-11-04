import React, { useState, useEffect } from "react";
import ky from "ky";
import { Header as InnerHeader } from "../../components/Header";
import { TTransaction } from "../../types/TTransaction";
import { TNotification } from "../../types/TNotification";

export function Header() {
  const [{ transaction, notifications }, setState] = useState<{
    transaction: TTransaction;
    notifications: TNotification[];
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
          notifications: data as TNotification[]
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
