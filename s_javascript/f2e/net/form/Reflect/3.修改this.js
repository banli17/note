var obj = {
	name: 'zs',
	get oname() {
		return this.name
	},
	set oname(x) {
		this.name = x
	}
}
var obj1 = {
	name: 'lisi'
}

var res = Reflect.get(obj, 'oname', obj1)
console.log(res, obj.oname)  // 'lisi'  'zs'

var res1 = Reflect.set(obj, 'oname', 'haha', obj1)

console.log(res1, obj1)  // true  {name: 'haha'}