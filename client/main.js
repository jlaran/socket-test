var socket = io.connect('http://socketstest.herokuapp.com:6677',{'forceNew': true});

socket.on('messages', function(data){
	console.log(data);
	render(data);
});

function render(data){
	var html = data.map(function(message, index){
		return (`
				<div class="message">
					<strong>${message.nickname} dice:</strong>
					<p>${message.text}</p>
				</div>
			`);
	}).join('');

	var container = document.getElementById('mensajes');

	container.innerHTML = html;
	container.scrollTop = container.scrollHeight;
}

function addMessage(e){
	var message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};

	document.getElementById('nickname').style.display = 'none';

	socket.emit('add-message', message);

	document.getElementById('nickname').value = "";
	document.getElementById('text').value = "";

	return false;
}