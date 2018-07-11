var obj = {
	length: 0,
	addElem: function (elem) {
		[].push.call(this, elem)
	}
}

obj.addElem({})

console.log(obj.length, obj)  // 1 { '0': {}, length: 1, addElem: [Function: addElem] }

// 使用push后，对象的length也会加1