const fs = require('fs')
const fp = require('lodash/fp')

// IO 函子的问题
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
    return new IO(fp.flowRight(fn, this._value))
  }
}

const readFile = (filename) => {
  return new IO(() => {
    return fs.readFileSync(filename, 'utf-8')
  })
}

const print = (x) => {
  return new IO(() => {
    console.log(x)
    return x
  })
}

const cat = fp.flowRight(print, readFile)

// r: IO(IO(x)) 会嵌套
const r = cat(__dirname + '/package.json')
// IO { _value: [Function (anonymous)] }

console.log(r._value()); // IO { _value: [Function (anonymous)] }
console.log(r._value()._value());
