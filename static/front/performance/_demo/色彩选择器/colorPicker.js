const colorPicker = (()=> {
	let rgb = 'rgb(255, 122, 0)'
	
	const el = $('.colorPicker')
	
	let centerRangeY = 0
	/**
	 * 初始化界面
	 */
	const init = ()=> {
		let html = `<div class="color-picker-box">
<div class="left-box"></div>
<div class="center-box"></div>
<div class="right-box"></div>
			</div>
`
		el.append($(html))
		setLeftBox()
	}
	
	// 设置left-box的颜色
	
	function setLeftBox() {
		let color = ['#fff', rgb, '#000'].join()
		$('.color-picker-box .left-box').css('background', `-webkit-linear-gradient(-45deg, ${color})`)
	}
	
	
	function getColor(e) {
		// 获取当前y的便宜
		centerRangeY = e.offsetY
		let centerRange = $('.color-picker-box .center-box').height() - 2
		
		let rate = centerRangeY / centerRange
		console.log(rate)
		
		// 总共分了6等分，看它处于哪个阶段，然后根据百分比计算对应的rgb值
		
	}
	
	
	init()
	
	// 获取滑动的从上到下的进度
	$('.color-picker-box .center-box').on('mousedown', getColor)
})();
