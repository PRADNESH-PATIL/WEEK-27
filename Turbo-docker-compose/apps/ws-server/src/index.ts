import express from "express";
import { WebSocketServer } from "ws";
import { prismaClient } from "@repo/db/client";

const app = express();
const port = 8081;
app.use(express.json());


const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    console.log("Received:", message.toString());

    try {
      await prismaClient.user.create({
        data: {
          username: Math.random().toString(),
          password: Math.random().toString(),
        },
      });
      ws.send(`Echo: ${message}`);
    } catch (err) {
      console.error("Prisma error:", err);
      ws.send("Error creating user");
    }
  });

  ws.send("Connected to WebSocket server");
});
