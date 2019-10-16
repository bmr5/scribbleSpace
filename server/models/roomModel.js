const mongoose = require('mongoose');

const uri = process.env.DB_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const RoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: false
  }
});

const createRoomModel = name => {
  return mongoose.model(name, RoomSchema);
};

module.exports = createRoomModel;
