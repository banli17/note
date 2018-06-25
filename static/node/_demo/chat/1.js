var net = require('net')
var clientServer = net.createServer()
var clientLists = []

clientServer.on('connection', (client) => {
	clientLists.push(client)
	
	clientLists.forEach(function (c) {
		c.on('data', function (data) {
			console.log(c == client)
			if (c != client) {
				console.log(data)
				c.write(data)
			}
		})
	})
})

clientServer.on('error', (error)=> {
	
})
clientServer.listen(8088)

