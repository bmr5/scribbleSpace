const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config();
const port = process.env.PORT || 3000;
const path = require('path');
const cookieParser = require('cookie-parser');

// const roomCtrl = require('./controllers/roomCtrl');
const userCtrl = require('./controllers/userCtrl');

app.use(express.json());
app.use(cookieParser());

//serve the bundle
app.use(express.static(path.join(__dirname, 'src')));

// app.use(express.static(path.resolve(__dirname, '../dist')), (req, res, next)=>{
//   next()
// }); //

// app.get('/dist/bundle.js', (req, res, next) => {
//   res.sendFile(path.resolve(__dirname, '../dist/bundle.js'));
// });

// app.get('/', (req, res, next) => {
//   res.sendFile(path.resolve(__dirname, '../src/index.html'));
// });

app.post('/login', userCtrl.checkLogin, (req, res, next) => {
  console.log('login on express', req.body);
});

app.use('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './../src/index.html'));
});

app.post('/test', userCtrl.updatePassword, (req, res, next) => {
  console.log(res.locals.updateComplete);
  res.status(200).send(JSON.stringify(res.locals));
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
