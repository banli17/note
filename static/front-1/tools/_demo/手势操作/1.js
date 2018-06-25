var af = new AlloyFinger(document, {
	touchStart: function () {
		console.log('touchStart1')
	}
})

af.on('touchStart', function () {
	console.log('touchStart')
})

af.on('swipe', function () {
	console.log('swipe')
})

af.on('tap', function () {
	console.log('tap')
})
af.on('singleTap', function () {
	console.log('singleTap')
})
