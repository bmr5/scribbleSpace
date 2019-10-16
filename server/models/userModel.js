const mongoose = require('mongoose');

const uri = 'mongodb+srv://Admin:heelie@cluster0-vzivm.mongodb.net/ScribbleSpace?retryWrites=true&w=majority'
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
