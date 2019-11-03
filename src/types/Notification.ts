export type Notification = {
  id: string;
  read: boolean;
  title: string;
};

export type NotificationDetail = Notification & {
  items: {
    type: "url" | "image" | "caption" | "text";
    body: string;
  }[];
};
