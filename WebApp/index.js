var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//this is your connection to the websocket
io.on('connection', function(socket){
    console.log('someone connected')

    //you can add events to your socket like this - notice it's the same as the one from the html
      socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });


})

http.listen(3000, function(){
  console.log('listening on *:3000');
});