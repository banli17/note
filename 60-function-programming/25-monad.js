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

  join() {
    return this._value()
  }

  flatMap(fn) {
    return this.map(fn).join()
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

let r = readFile(__dirname + '/package.json')
  // .map(x => x.toUpperCase())
  .map(fp.toUpper)
  .flatMap(print)
  .join()

console.log(r);
