import express from "express";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  prismaClient.user.findMany()
    .then((users: any[]) => {   // added type here
      res.json(users);
    })
    .catch((err: Error) => {   // added type here
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  prismaClient.user.create({
    data: {
      username,
      password
    }
  })
    .then((user: any) => {     // added type here
      res.status(201).json(user);
    })
    .catch((err: Error) => {  // added type here
      res.status(500).json({ error: err.message });
    });
})

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
