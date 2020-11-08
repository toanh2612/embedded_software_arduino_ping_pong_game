"use strict";

const socket = io("ws://localhost:777");
console.log('pong.js');
socket.on("connect", () => {
  console.log({
    task: "connect"
  });
  socket.emit("message", data => {
    console.log({
      event: "message",
      data
    });
  });
});
socket.on("server-to-client", data => {
  console.log({
    event: 'server-to-client',
    data
  });
}); // socket.on("movingPlayer1",(evt)=>{
//     console.log({
//         task:"on movingPlayer1",
//     });
// });
// socket.on("movingPlayer2",(evt)=>{
//     console.log({
//         task:"on movingPlayer2",
//     });
// });