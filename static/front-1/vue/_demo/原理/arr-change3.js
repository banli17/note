class FakeArray extends Array{
	push(...args){
		console.log('我被改变啦');
		return super.push(...args);
	}
}

var list = [1, 2, 3];

var arr = new FakeArray(...list);

console.log(arr.length)

arr.push(3);

console.log(arr)