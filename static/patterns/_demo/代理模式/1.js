var xiaoming = {
	sendFlower: function () {
		agent.receiveFlower()
	}
}

var agent = {
	sendFlower: function () {
		xiaofang.receiveFlower()
	}
}

var xiaofang = {
	receiveFlower: function () {
		console.log('收到')
	}
}