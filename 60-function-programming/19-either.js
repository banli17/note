// Either 函子
class Left {
  static of (value) {
    return new Left(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return this
  }
}

class Right {
  static of (value) {
    return new Right(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return Right.of(fn(this._value))
  }
}

// 纯函数：任何情况下都返回相同类型的数据
function parseJSON(str) {
  try {
    return Right.of(JSON.parse(str))
  } catch (e) {
    return Left.of({
      error: e.message
    })
  }
}

// 解析错误
const l = parseJSON('{name: zs}')
console.log(l); // Left { _value: { error: 'Unexpected token n in JSON at position 1' } }

// 解析正确
const r = parseJSON('{"name": "zs"}')
  .map(x => x.name.toUpperCase())

console.log(r); // { _value: 'ZS' }
