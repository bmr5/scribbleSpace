const mongoose = require('mongoose');
const uri = 'mongodb+srv://Admin:heelie@cluster0-vzivm.mongodb.net/ScribbleSpace?retryWrites=true&w=majority'
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })

const Users = require('../models/userModel');

const userCtrl = {};

userCtrl.setCookies = function(req, res, next) {
  console.log('Hit Set Cookies');
  const { name, roomName, socketId } = req.body;
  res.cookie('socketId', socketId);
  res.cookie('name', name);
  res.cookie('roomName', roomName);
  next();
};

userCtrl.checkLogin = (req, res, next) => {
  const {name, password} = req.body
  Users.find({username: name, password: password}, (err ,returnUser)=>{
    if (err) console.log(err)
    else{
      res.locals.canEnter = false
      if (returnUser.length === 1) res.locals.canEnter = true 
      next()
    }
  })
}

userCtrl.checkUser = (req, res, next) => {
  const {name} = req.body
  Users.find({username: name}, (err ,returnUsername)=>{
    if (err) console.log(err)
    else{
      res.locals.username = returnUsername
      next()
    }
  })
}

userCtrl.updatePassword = (req, res, next) => {
  const {name, password} = req.body
  Users.findOneAndUpdate({username: name}, {password: password}, (err ,response)=>{
    if (err) console.log(err)
    res.locals.updateComplete = true
    next()
  })
}

userCtrl.createUser = function(req, res, next) {
  const {name, password} = req.body
  let singleUser = new Users({username: name, password: password})
  singleUser.save((err, user)=>{
    if (err) console.log(err)
    else {
      next()
    }
  })
}


module.exports = userCtrl;
