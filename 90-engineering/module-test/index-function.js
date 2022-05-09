function api() {
  return {
    code: 0,
    data: {
      a: 1,
      b: 2
    }
  }
}

function handler(data, key) {
  return data.data[key]
}

function sum(a, b) {
  return a + b
}

const data = api()

const a = handler(data, 'a')
const b = handler(data, 'b')

console.log(sum(a, b))
