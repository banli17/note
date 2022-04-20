// MayBe 函子: 处理异常 null / undefined 数据，而不会报错
class MayBe {
  static of (value) {
    return new MayBe(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    // 如果是 null 返回一个 null MayBe 函子
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }
  isNothing() {
    return this._value === null || this._value === undefined
  }
}

const m = MayBe.of('hello')
  .map(x => x.toUpperCase())
  .map(x => null)
  .map(x => x.split(''))

console.log(m); // { _value: null }

// MayBe 函子的问题：链式调用时如果出现 null 值，不知道是哪一步出现的
