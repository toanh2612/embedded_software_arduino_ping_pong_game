"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const server = require("http").createServer();

const io = require("socket.io")(server, {
  // path: '/test',
  serveClient: true,
  // below are engine.IO options
  pingInterval: 60 * 60 * 1000 * 24,
  pingTimeout: 60 * 60 * 10,
  cookie: false,
  setTimeout: 60 * 60 * 1000 * 24
}); // io.use(function (socket, next) {
//   const token =
//     socket.handshake && socket.handshake.query && socket.handshake.query.token
//       ? socket.handshake.query.token
//       : "";
//   jwt.verify(token, CONFIG["JWT_SECRET"], function (error, decoded) {
//     if (error) {
//       responseErrorSocket({
//         socketId: socket.id,
//         message: "Unauthenticaticed socket ",
//         error: "Unauthenticaticed socket",
//       });
//       setTimeout(() => socket.disconnect(true), 5000);
//       throw new Error("Unauthenticaticed socket");
//     }
//   });
//   next();
// });


const rooms = {};
io.on("connection", socket => {
  socket.on("join-room", async ({
    roomId
  }) => {
    try {
      roomId = roomId.toString();
      socket.join(roomId);
      socket.roomId = roomId;

      if (rooms[socket.roomId] === null || rooms[socket.roomId] === undefined) {
        rooms[socket.roomId] = [];
      }

      if (rooms[socket.roomId].indexOf(socket.id) === -1) {
        rooms[socket.roomId].push(socket.id);
      }

      console.log({
        rooms
      });
    } catch (error) {
      console.log({
        task: "socket.io",
        error
      });
    }
  });
  socket.on("device-to-server", data => {
    if (data && data.roomId) {
      console.log(data);
      data.roomId = data.roomId.toString();
      io.sockets.in(data.roomId).emit("server-to-client", data); // io.to(data.roomId).emit("server-to-client",data);
    }
  });
  socket.on("disconnect", function (data) {
    try {
      socket.leave(socket.roomId);

      if (socket.roomId && rooms[socket.roomId]) {
        console.log({
          event: 'disconnect',
          roomId: socket.roomId,
          client: socket.id
        });
        rooms[socket.roomId].splice(rooms[socket.roomId].indexOf(socket.id), 1);
      }
    } catch (e) {
      console.log(e);
    }
  });
});
var _default = server;
exports.default = _default;