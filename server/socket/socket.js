import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import sendNewMessage from "./actions/sendNewMessage.js";
const audience = process.env.CLIENT_URL;
const issuer = process.env.SERVER_URL;

//Config
const socketConnection = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: audience,
    },
  });

  //Middleware
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      {
        ignoreExpiration: false,
        audience: `${audience}`,
        issuer: `${issuer}`,
      },
      (err, decoded) => {
        if (err) return;
        if (decoded.UserInfo.userId) next();
      }
    );
  });

  //Connection
  io.on("connection", (socket) => {
    console.log("Socket connnected");
    socket.on("registerUser", async (userId) => {
      console.log(`User registered: ${userId}`);
      socket.join(userId);
    });

    socket.on("join-channel", (channelId) => {
      socket.join(channelId);
    });

    socket.on(
      "sent_new_message",
      ({ message, members, isGroup, groupName }) => {
        sendNewMessage({ message, members, isGroup, groupName })
          .then((res) => {
            if (res?.data) {
              members.forEach((m) => {
                io.to(m.userId).emit("new_channel", {
                  data: { ...res.data, isGroup: isGroup, groupName: groupName },
                });
              });
              io.to(message.channelId).emit("new_message", {
                data: { ...res.data, isGroup: isGroup, groupName: groupName },
              });
            }
            io.emit("sent_new_message", { message: "Sent" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );

    socket.on("client_start_typing", (channelId) => {
      socket.to(channelId).emit("server_start_typing", {
        data: channelId,
      });
    });

    socket.on("client_end_typing", (channelId) => {
      socket.to(channelId).emit("server_end_typing", {
        data: channelId,
      });
    });

    socket.on("client_new_group_channel", (data) => {
      data?.members.forEach((member) => {
        io.to(member.userId).emit("new_channel", {
          data: data,
        });
      });
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnect");
    });
  });
};

export default socketConnection;
