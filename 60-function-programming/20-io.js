const fp = require('lodash/fp')
// IO 函子
class IO {
  static of (value) {
    return new IO(() => {
      return value
    })
  }
  constructor(fn) {
    this._value = fn
  }
  map(fn) {
    // 这里不是调用 of
    return new IO(fp.flowRight(fn, this._value))
  }
}

let r = IO.of(process).map(p => p.execPath)
console.log(r);

console.log(r._value()); // /Users/banli/.nvm/versions/node/v14.18.1/bin/node
