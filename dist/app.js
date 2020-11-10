"use strict";

var _index = _interopRequireDefault(require("./socket.io/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require('express');

const app = express();
const host = '0.0.0.0';
const httpPort = 3000;
const socketPort = 777;

const path = require('path');

app.use('/public', express.static(__dirname + '/public'));
app.set('views', path.resolve(process.cwd(), 'src', 'views'));
app.set('view engine', 'ejs'); //extension of views

_index.default.listen(socketPort, host, () => {
  console.log({
    task: 'socket server',
    host,
    socketPort
  });
});

app.listen(httpPort, host, () => {
  console.log({
    task: 'app server',
    host,
    httpPort
  });
});
app.get('/game', (req, res) => {
  res.render('index');
});