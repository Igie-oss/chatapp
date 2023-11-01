import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import socketConnection from "./socket/socket.js";
import root from "./routes/root.js";
import authRoutes from "./routes/authRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT;
const app = express();
const httpServer = http.createServer(app);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", root);

app.use("/auth", authRoutes);

app.use("/register", registerRoutes);

app.use("/channel", channelRoutes);

app.use("/users", usersRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "error.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Socket
socketConnection(httpServer);
