const mongoose = require('mongoose');
const uri = process.env.DB_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

<<<<<<< HEAD
const Room = createRoomModel('room6');
=======
const Room = require('../models/roomModel');
>>>>>>> dev

const roomCtrl = {};

roomCtrl.createRoom = (req, res, next) => {
  const { roomName, socketId, username } = req.body;
  console.log(roomName, socketId, username);
  let singleRoom = new Room({
    roomName: roomName,
    socketId: socketId,
    users: [username]
  });

  singleRoom.save((err, room) => {
    if (err) {
      console.log(err.status);
      res.status(300).send({ error: 'invalid data or room already exists' });
    } else {
      res.locals.roomAvailable = true;
      res.locals.socketId = socketId;
      res.locals.users = [username];
      next();
    }
  });
};

<<<<<<< HEAD
roomCtrl.verifyUser = function(req, res, next) {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, password2 });
  } else {
    User.findOne({ email: email }, function(err, user) {
      if (user) {
        // user exist
        console.log('email exist!!!!!');
        errors.push({ msg: 'Email is already registered' });
        res.render('register', { errors, name, email, password, password2 });
      } else {
        console.log('user verified');
        return next();
      }
    });
  }
};
=======
>>>>>>> dev

module.exports = roomCtrl;
