const http = require("http");
const io = require("socket.io");
const mongoose = require("mongoose");

const connectedClients = {};

let httpListener;
let ioListener;

const startHttpListener = (app) => {
  httpListener = http.Server(app);
  return httpListener;
};

const webSocketIO = () => {
  if (!httpListener) {
    console.log("Something went wrong...");
    return;
  }

  if (!ioListener) {
    ioListener = io(httpListener);
  }

  return ioListener;
};

const startWebSocketListener = (app) => {
  startHttpListener(app);

  webSocketIO().on("connection", (socket) => {
    socket.on("disconnect", () => {
      console.log("remove socket");
      for (let userId in connectedClients) {
        if (connectedClients[userId].socket === socket.id) {
          delete connectedClients[userId];
          break;
        }
      }
    });

    socket.on("add-user", (data) => {
      console.log(
        "🚀 ~ file: web-sockets.js ~ line 44 ~ socket.on ~ data",
        data
      );

      connectedClients[data.userId] = { socket: socket.id };
      console.log(
        "🚀 ~ file: web-sockets.js ~ line 54 ~ socket.on ~ connectedClients",
        connectedClients
      );
      console.log("socket:", connectedClients[data.userId].socket);

      //   const socketId = connectedClients[data.userId].socket;

      //   setInterval(() => {
      //     webSocketIO().to(socketId).emit("order-update", {
      //       action: "order-update",
      //       time: new Date(),
      //     });
      //   }, 1000);
    });
  });

  const PORT = process.env.PORT;
  const DATABASE = process.env.DATABASE;

  httpListener.listen(PORT, async () => {
    console.log("🚀 ~ file: index.js ~ line 62 ~ app.listen ~ port", PORT);

    try {
      await mongoose.connect(DATABASE);
      console.log(".");
      console.log(
        "🚀 ~ file: index.js ~ line 29 ~ app.listen ~ ...Connceted to MONGO.."
      );
    } catch (error) {
      console.log("🚀 ~ file: index.js ~ line 31 ~ app.listen ~ error", error);
    }
  });
};

module.exports = { connectedClients, webSocketIO, startWebSocketListener };
