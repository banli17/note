function isValid(s) {
  let map = {
    '{': '}',
    '[': ']',
    '(': ')',
  }
  let stack = []
  s.split("").forEach(item => {
    let t = stack[stack.length - 1]
    if (item === map[t]) {
      stack.pop()
    } else {
      stack.push(item)
    }
  })
  return stack.length === 0
}

console.log(isValid('[]'))
console.log(isValid('[{([)]}]'))
console.log(isValid('[{]'))
