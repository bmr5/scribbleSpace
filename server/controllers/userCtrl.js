<<<<<<< HEAD
const mongoose = require('mongoose');
const uri = process.env.DB_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const Users = require('../models/userModel');

const userCtrl = {};

userCtrl.checkLogin = (req, res, next) => {
  const { username, password } = req.body;
  Users.find({ username: username, password: password }, (err, returnUser) => {
    if (err) console.log(err);
    else {
      res.locals.canEnter = false;
      if (returnUser.length === 1) res.locals.canEnter = true;
      next();
    }
  });
};

userCtrl.checkUser = (req, res, next) => {
  const { username } = req.body;
  Users.find({ username: username }, (err, returnUsername) => {
    if (err) console.log(err);
    else {
      res.locals.userExists = false;
      if (returnUsername.length === 1) res.locals.userExists = true;
      next();
    }
  });
};

userCtrl.updatePassword = (req, res, next) => {
  const { username, password } = req.body;
  Users.findOneAndUpdate(
    { username: username },
    { password: password },
    (err, response) => {
      if (err) console.log(err);
      res.locals.updateComplete = true;
      next();
    }
  );
};

userCtrl.createUser = function(req, res, next) {
  const { username, password } = req.body;
  console.log('google auth user create', req.body);
  let singleUser = new Users({ username: username, password: password });
  singleUser.save((err, user) => {
    if (err) {
      console.log(err.status);
      // res.status(300).send({ error: 'user already exists' });
    } else {
      next();
    }
  });
<<<<<<< HEAD
=======
const User = require('../models/User');

const userCtrl = {};

userCtrl.createUser = function(req, res, next) {
  const { name, email, password } = req.body;
  User.create({ name, email, password }, (err, db) => {
    if (err) {
      return res.render('../views/register', { error: err });
    }
    res.locals.acc = db; // res.locals.id = db._id;
    console.log('account created');
    return next();
  });
};

userCtrl.verifyUser = function(req, res, next) {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }
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
>>>>>>> 81074db9446e002b9ae37673a08e9c6e4a140c74
=======

>>>>>>> dev
};

module.exports = userCtrl;
