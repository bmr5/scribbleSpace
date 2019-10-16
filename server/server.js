const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config();
const port = process.env.PORT || 3000;
const path = require('path');
const cookieParser = require('cookie-parser');

//websocket stuff
const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
//turn it on
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});
//maintain all active connections in the clients object
const clients = {};
// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};
//on a request to the websocket server get a new unique user id
wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
})

//controllers
const roomCtrl = require('./controllers/roomCtrl');
const userCtrl = require('./controllers/userCtrl');

app.use(express.json());
app.use(cookieParser());

//serve the bundle
app.use(express.static(path.join(__dirname, 'src')));

app.get('/dist/bundle.js', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../dist/bundle.js'));
});

//user routes

app.post('/createAccount', userCtrl.createUser, (req, res, next) => {
  console.log('created acount for:', req.body)
  res.redirect('/')
})

app.post('/login', userCtrl.checkLogin, (req, res, next) => {
  console.log('login for:', req.body);
  res.send(res.locals)
});

app.post('/forgotPassword', userCtrl.checkUser, (req, res, next) => {
  console.log('checked DB for:', req.body.name);
  res.status(200).send(JSON.stringify(res.locals));
});

app.post('/resetPassword', userCtrl.updatePassword, (req, res, next)=>{
  console.log('reset password for:', req.body.name,'from',req.body.password,'to', req.body.password)
  res.redirect('/')
})

//room routes

app.post('/createRoom', roomCtrl.createRoom, (req, res, next)=>{
  console.log('created room for:', req.body.username, 'at', res.locals.socketId)
  res.send(res.locals)
})

//generic routes

app.get('/', (req, res) => {
  console.log('home html')
  res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'));
});

// standard bad endpoint, send 404
app.use('*', (req, res) => {
  res.status(404).send('no route found');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    status: 500,
    message: 'Default Error from the Global Error Handler'
  };
});

function onConnection(socket) {
  socket.on('transfer', data => io.emit('broadcast', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
