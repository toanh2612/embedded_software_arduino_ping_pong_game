const express = require('express');
const app = express();
const host = '0.0.0.0';
const httpPort = 3000;
const socketPort = 777;
const path = require('path');

import socketServer from './socket.io/index';

app.use('/public',express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //extension of views

socketServer.listen(socketPort,host,()=>{
    console.log({
        task: 'socket server',
        host,
        socketPort 
    });
})
app.listen(httpPort,host, ()=>{
    console.log({
        task: 'app server',
        host,
        httpPort 
    });
});

app.get('/game',(req,res)=>{
    res.render('index');
})



