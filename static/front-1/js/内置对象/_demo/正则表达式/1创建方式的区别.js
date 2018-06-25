var str = "This is an\n antzone good";
var reg = /an$/m;
console.log(reg.exec(str));


var str1 = '2018-11-12'
var reg1 = /(\d+)-(\d+)-(\d+)/

var new_str1 = str1.replace(reg1, '$1年$2月$3日')
console.log(new_str1, str1)

var str1 = '2018-11-12'
var reg2 = /(\d)(\d)/g
var new_str2 = str1.replace(reg2, (...args)=> {
	console.log(args) // [ '20', '2', '0', 0, '2018-11-12' ]
})