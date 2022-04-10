function compose(f, g) {
  return (value) => {
    return f(g(value))
  }
}

function reverse(arr) {
  return arr.reverse()
}

function first(arr) {
  return arr[0]
}

const last = compose(first, reverse)

console.log(last([1, 2, 3]));

// 组合的好处是，让细粒度的函数 任意组合和复用
