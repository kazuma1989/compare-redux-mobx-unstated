export type Notification = {
  id: string;
  read: boolean;
  title: string;
  items: {
    type: "url" | "image" | "caption" | "text";
    body: string;
  }[];
};
