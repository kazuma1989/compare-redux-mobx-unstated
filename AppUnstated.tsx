import React, { useState } from "react";
import { createContainer } from "unstated-next";
import produce from "immer";

type Notification = {
  read: boolean;
  title: string;
  body: string;
};

function useNotification() {
  const [notificationList, setNotificationList] = useState<Notification[]>([
    {
      read: false,
      title: "foo",
      body: "foooo"
    }
  ]);

  return {
    notificationList,

    markAsRead(index: number) {
      setNotificationList(list =>
        produce(list, draft => {
          draft[index].read = true;
        })
      );
    }
  };
}

const {
  Provider: NotificationProvider,
  useContainer: useNotificationContainer
} = createContainer(useNotification);

function Header() {
  const { notificationList, markAsRead } = useNotificationContainer();

  return (
    <div>
      {notificationList.map(({ read, title }, i) => (
        <div
          key={i}
          onClick={() => markAsRead(i)}
          style={{
            fontWeight: read ? "normal" : "bold"
          }}
        >
          {title}
        </div>
      ))}
    </div>
  );
}

export function AppUnstated({ style }: { style: React.CSSProperties }) {
  return (
    <NotificationProvider>
      <div style={style}>
        <Header />
      </div>
    </NotificationProvider>
  );
}
