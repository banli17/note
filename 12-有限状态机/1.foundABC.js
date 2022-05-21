function start(s){
	 if(s === 'a'){
		 return foundA
	 }else{
		//  state(s) // 找不到需要处理 s, 否则会丢失, 不能 return start() 会陷入死循环
		// start 返回状态，后续的状态找不到可以直接处理 s
		return start
	 }
}

function foundA(s){
	if(s === 'b'){
		return foundB
	}else{
		// 直接处理 s, 代理一下
		return start(s)
	}
}

function foundB(s){
	if(s === 'c'){
		return end
	}else{
		return start(s)
	}
}

function end(){
	return end
}

function match(str){
	let state = start
	for(let s of str){
		console.log(state)

		state = state(s)
	}
	return state === end
}

const str = 'a hello aabdc ef'
match(str)