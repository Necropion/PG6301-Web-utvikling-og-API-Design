import express from "express";
import cookieParser from "cookie-parser";
import cookie from "cookie";
import mongoose from "mongoose";
import { WebSocketServer } from "ws";

import dotenv from "dotenv";
dotenv.config();

import * as path from "path";
import loginRoutes from "./routes/loginRoutes.js";
import googleRoutes from "./routes/googleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import msgRoutes from "./routes/msgRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

//Logger for requests sent from browser
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Routes
app.use("/api/login", loginRoutes);
app.use("/api/google", googleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/msg", msgRoutes);

//Connect to Database

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log(error);
  });

const wsServer = new WebSocketServer({ noServer: true });

//Server listener
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Connected to the database and listening to port: ${process.env.PORT}`,
  );
});

const sockets = [];

server.on("upgrade", (req, socket, head) => {
  const cookies = cookie.parse(req.headers.cookie);
  const signedCookies = cookieParser.signedCookies(
    cookies,
    process.env.COOKIE_SECRET,
  );
  const { username } = signedCookies;

  wsServer.handleUpgrade(req, socket, head, (socket) => {
    sockets.push(socket);

    socket.on("message", (buffer) => {
      const message = buffer.toString();

      console.log(JSON.parse(message));
      for (const s of sockets) {
        s.send(message);
      }
    });
  });
});
