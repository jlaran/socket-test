var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/', function(req, res){
	res.status(200).send('Hola Mundo');
});

var messages = [{
	id: 1,
	text: 'Bienvenido al Chat Privado',
	nickname: 'Bot Virtual'
}];

io.on('connection', function(socket){
	console.log("alguien se conecto con la IP "+ socket.handshake.address);

	socket.emit('messages', messages);

	socket.on('add-message', function(data){
		messages.push(data);

		io.sockets.emit('messages', messages);
	});
});

server.listen(6677, function(){
	console.log("server running on http://socketstest.herokuapp.com:6677");
});