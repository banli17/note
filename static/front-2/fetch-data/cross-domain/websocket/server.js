var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function (socket) {
	console.log('a user connected');
	socket.emit('news', {hello: 'world'});
	socket.on('my other event', function (data) {
		console.log('服务器收到', data)
		if (data.my === 'dat11a') {
			socket.emit('haha', {name: 'zs'})
		}
	})
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});

server.listen(5000);
