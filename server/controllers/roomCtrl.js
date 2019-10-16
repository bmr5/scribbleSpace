const mongoose = require('mongoose');
const uri = process.env.DB_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })

const Rooms = require('../models/roomModel');

const roomCtrl = {};

roomCtrl.createRoom = (req, res, next)=>{
  const { roomName, socketId, username } = req.body;
  console.log(roomName, socketId, username)
  let singleRoom = new Rooms({
    roomName: roomName,
    socketId: socketId,
    users: [username]
  });

  singleRoom.save((err, room) => {
    if (err) {
      console.log(err.status);
      res.status(300).send({error: 'room already exists'})
    }
    else {
      res.locals.roomAvailable = true
      res.locals.socketId = socketId
      res.locals.users = [username]
      next();
    }
  });
}


module.exports = roomCtrl;
