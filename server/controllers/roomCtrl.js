const mongoose = require('mongoose');
const uri = 'mongodb+srv://Admin:heelie@cluster0-vzivm.mongodb.net/ScribbleSpace?retryWrites=true&w=majority'
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })

const Rooms = require('../models/roomModel');

const roomCtrl = {};



module.exports = roomCtrl;
