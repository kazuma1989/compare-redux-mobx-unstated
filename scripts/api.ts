import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.use(function fakeDelay(req, resp, next) {
  if (req.method === "OPTIONS") {
    next();
    return;
  }

  const delayMs = Math.random() * 1000;
  setTimeout(next, delayMs);
});

app.get("/api/notifications", (req, resp) => {
  resp.json(stubNotifications);
});

app.get("/api/notifications/:id", (req, resp) => {
  const notification = stubNotifications.find(n => n.id === req.params.id);
  if (!notification) {
    resp.sendStatus(404);
    return;
  }

  resp.json(notification);
});

app.listen(8080, () => console.log(`Listening on port 8080`));

type Notification = {
  id: string;
  read: boolean;
  title: string;
  items: {
    type: "url" | "image" | "caption" | "text";
    body: string;
  }[];
};

const stubNotifications: Notification[] = [
  {
    id: "xxx",
    read: false,
    title: "The title",
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
    title: "The title",
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
    title: "The title",
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
