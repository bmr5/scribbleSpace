const mongoose = require('mongoose');

const uri = process.env.DB_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
    unique: true
  },
  users: {
    type: [String],
    required: false
  }
});

const Rooms = mongoose.model('Rooms', RoomSchema);

module.exports = Rooms;
