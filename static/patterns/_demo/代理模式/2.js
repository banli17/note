const myImage = (function () {
	var img = $('img')
	return {
		setSrc(src){
			img.src = src
		}
	}
})()

