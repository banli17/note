var str = "name=zhangsan&age=12"
var reg = /([^&=]+)=([^&=]*)/gi; // [^&=]+表示匹配非=&的连续字符串

var paramObj = {}
str.replace(reg, (...args)=> {
	obj[args[1]] = args[2]
})

console.log(paramObj);  // { name: 'zhangsan', age: '12' }


