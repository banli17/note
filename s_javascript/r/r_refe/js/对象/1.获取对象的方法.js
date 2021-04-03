// 不使用 new ，获取对象的方法


// 1.字面量
var o = {}
o = /\w/
o = []

o = function(){}
o = Symbol('hi')
// dom api
o = document.createElement('p')

// 内置 api
o = JSON.parse('{}')
o = Object.create(null)
o = Object.assign({k:2},{k:4})

o = Object(null)