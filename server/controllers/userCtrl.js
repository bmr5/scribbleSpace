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
      res.locals.userExists = false
      if (returnUsername.length ===1) res.locals.userExists = true;
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
  let singleUser = new Users({ username: username, password: password });
  singleUser.save((err, user) => {
    if (err) {
      console.log(err.status);
      res.status(300).send({error: 'user already exists'})
    }
    else {
      next();
    }
  });

};

module.exports = userCtrl;
