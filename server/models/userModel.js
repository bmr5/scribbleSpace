const mongoose = require('mongoose');
<<<<<<< HEAD
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
=======
const uri = process.env.DB_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const UserSchema = new mongoose.Schema({
  username: {
>>>>>>> dev
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
<<<<<<< HEAD
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

<<<<<<< HEAD
const User = mongoose.model('User', UserSchema);

module.exports = User;
=======
UserSchema.pre('save', function(next) {
  // console.log('YAY! userSchema');
  if (this.password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
>>>>>>> 81074db9446e002b9ae37673a08e9c6e4a140c74
=======
    required: true
  }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
>>>>>>> dev
