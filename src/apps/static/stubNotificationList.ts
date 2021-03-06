import { TNotificationDetail } from "../../types/TNotification";

export const stubNotificationList: TNotificationDetail[] = [
  {
    id: "xxx",
    read: false,
    title: "The title XXX",
    items: [
      {
        type: "image",
        body: "https://via.placeholder.com/600x200.png"
      },
      {
        type: "url",
        body: "https://via.placeholder.com/600x200.png"
      },
      {
        type: "caption",
        body: "The caption"
      },
      {
        type: "text",
        body: "Lorem ipsum"
      }
    ]
  },
  {
    id: "yyy",
    read: true,
    title: "The title YYY",
    items: [
      {
        type: "caption",
        body: "The caption"
      },
      {
        type: "text",
        body: "Lorem ipsum"
      }
    ]
  },
  {
    id: "zzz",
    read: false,
    title: "The title ZZZ",
    items: [
      {
        type: "text",
        body: "Lorem ipsum"
      },
      {
        type: "text",
        body: "Lorem ipsum, dolor"
      }
    ]
  }
];
