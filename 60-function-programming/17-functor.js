// Functor 函子
// class Container {
//   constructor(value) {
//     this._value = value
//   }

//   map(fn) {
//     // 要返回一个新的 Functor
//     return new Container(fn(this._value))
//   }
// }


// new Container(5)
//   .map(x => x + 1)
//   .map(x => x * x)


// 不用 new 的方式
class Container {
  static of (value) {
    return new Container(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return Container.of(fn(this._value))
  }
}
const c2 = Container.of(5)
  .map(x => x + 1)
  .map(x => x * x)

console.log(c2._value) // 36
