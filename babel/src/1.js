const babel = require('@babel/core')
const {types: t} = babel

const ast = t.program([
  t.arrayExpression([t.stringLiteral('xxx')])
])

// let result = babel.transformFromAstSync(ast)

console.log(result.code)

