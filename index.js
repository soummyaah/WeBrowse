var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");
var request = require('request');


var allTokens = {};
var globalSocket;

app.use(express.static(path.join(__dirname, 'public')));



app.get('/pr', function (req, res, next) {
   
 request(  req.query.url , function (error, response, body) {
  if (!error && response.statusCode == 200) {
   res.send(body) // Show the HTML for the Google homepage. 
  }
})
});


app.get('/:tokenId', function(req, res){
  tokenId = req.param("tokenId");

 

  res.sendFile(__dirname + '/index.html'); //
});


function startAnotherRoom( socket ,  tokenId)
{
	console.log("ROOM ENTERED " + tokenId);
	 socket.on('chat' + tokenId, function(msg){
	    io.emit('chat' + tokenId , msg);
	  });

    socket.on('mouse' + tokenId, function(msg){
      io.emit('mouse' + tokenId , msg);
      console.log(msg.x , msg.y)
    });

    socket.on('scroll' + tokenId, function(msg){
      console.log("scroll" , msg.data)
      io.emit('scroll' + tokenId , msg);
    });

    socket.on('notes' + tokenId, function(msg){
      io.emit('notes' + tokenId , msg);
    });

     socket.on('selectedText' + tokenId, function(msg){
      io.emit('selectedText' + tokenId , msg);
    });

     socket.on('highlight' + tokenId, function(msg){
      io.emit('highlight' + tokenId , msg);
    });

    socket.on('link' + tokenId, function(msg){
      io.emit('link' + tokenId , msg);
      console.log("UUURRRLL " , msg);
    });

    


}


io.on('connection', function(socket){

 	console.log("NEW CONNNN");
 

   socket.on('initRoom', function(roomId){
       startAnotherRoom( socket ,  roomId)
      io.emit('initRoom' , roomId);
    });



 
});




http.listen(3000, function(){
  console.log('listening on *:3000');
});
