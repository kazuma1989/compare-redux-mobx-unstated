export type TNotification = {
  id: string;
  read: boolean;
  title: string;
};

export type TNotificationDetail = TNotification & {
  items: {
    type: "url" | "image" | "caption" | "text";
    body: string;
  }[];
};
