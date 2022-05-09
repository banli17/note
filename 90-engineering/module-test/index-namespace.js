window._Module = {
  api() {
    return {
      code: 0,
      data: {
        a: 1,
        b: 2
      }
    }
  },

  handler(data, key) {
    return data.data[key]
  },
  sum(a, b) {
    return a + b
  }


}

const m = window._Module
const data = m.api()

const a = m.handler(data, 'a')
const b = m.handler(data, 'b')

console.log(m.sum(a, b))
