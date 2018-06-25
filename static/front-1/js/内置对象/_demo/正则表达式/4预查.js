var a = 'hello nihao xhell'

var reg = /\b\w+(?!\b)/g

console.log(a.match(reg))  //[ 'hell', 'niha', 'xhel' ]


var c = '99999999999'.replace(/\d{1,3}((?=\d{3})+$)/g, '$&,')

console.log(c)


// var d = '99999999999'.replace(/(?<=(\d))\d{1,3}/, '$&,')


var e = 'hello'.replace(/h/, '$$')
console.log(e)