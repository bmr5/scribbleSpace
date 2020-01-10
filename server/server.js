const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const { google } = require('googleapis');
const { url, oauth2Client } = require('./controllers/googleOAuth');
const fetch = require('node-fetch');

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

app.get('/scribble-svgrepo-com.svg', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../dist/scribble-svgrepo-com.svg'));
});

app.get('/google.png', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../dist/google.png'));
});

//user routes

app.post('/createAccount', userCtrl.createUser, (req, res, next) => {
  console.log('created acount for:', req.body);
  res.redirect('/');
});

app.post('/login', userCtrl.checkLogin, (req, res, next) => {
  console.log('login for:', req.body);
  res.cookie('username', req.body.username);
  res.send(res.locals);
});

app.post('/forgotPassword', userCtrl.checkUser, (req, res, next) => {
  console.log('checked DB for:', req.body.name);
  res.status(200).send(JSON.stringify(res.locals));
});

app.post('/resetPassword', userCtrl.updatePassword, (req, res, next) => {
  console.log(
    'reset password for:',
    req.body.name,
    'from',
    req.body.password,
    'to',
    req.body.password
  );
  res.redirect('/');
});

app.get('/logout', (req, res, next)=> {
  cookies.set('username', {expires: Date.now()})
  res.redirect('/')
})

//oauth routes
app.get('/google', (req, res) => {
  res.redirect(url);
});

app.get('/scribbleSpace', async (req, res, next) => {
  const authCode = req.query.code;
  const { tokens } = await oauth2Client.getToken(authCode);
  oauth2Client.setCredentials(tokens);
  // console.log(tokens);
  fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokens.id_token}`)
    .then(res => res.json())
    .then(data => {
      console.log('oauth successful', data);
      req.body.username = data.email;
      req.body.password = data.kid;
      userCtrl.createUser(req, res, next);
    });
  res.locals.loggedIn = true;
  res.cookie('username', req.body.username);

  res.redirect('/spaces');
});

//room routes

app.post('/scribbleSpace', roomCtrl.createRoom, (req, res, next) => {
  res.send({ status: 'available' });
});

app.post('/createRoom', roomCtrl.createRoom, (req, res, next) => {
  console.log(
    'created room for:',
    req.body.username,
    'at',
    res.locals.socketId
  );
  res.send(res.locals);
});

// log req / res
app.use((req, res, next) => {
  console.log(
    `FLOW:: METHOD: ${req.method}, PATH: ${req.url}, BODY: ${JSON.stringify(
      req.body
    )}`
  );
  return next();
});

//generic routes

app.use('*', (req, res) => {
  console.log('home html');
  res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'));
});

// standard bad endpoint, send 404
// app.use('*', (req, res) => {
//   res.status(404).send('no route found');
// });

// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    status: 500,
    message: 'Default Error from the Global Error Handler'
  };
});

// function onConnection(socket) {
//   socket.on('transfer', data => io.emit('broadcast', data));
// }

//websocket stuff
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//establish the connection to the socket
io.on('connection', function(socket) {
  console.log(`you're not alone`);
  //describe events by matching them up with the strings you emit
  socket.on('chat message', data => {
    io.emit('chat message', data);
  });

  socket.on('drawing', data => {
    socket.broadcast.emit('drawing', data);
  });
});

http.listen(port, () => console.log('listening on port ' + port));
// app.listen(port, () => console.log('listening on port ' + port));
