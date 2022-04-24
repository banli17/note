const babel = require('@babel/core')
const {types: t} = babel

const code = `
export default BPMountBuildingStatus_TEST

`

    // propertyPanel: property,

// console.log(t. ObjectProperty)

const ast = babel.parseSync(code);

babel.traverse(ast, {
  enter: (path) => {
    // if (path.isObjectExpression()) {
    //   // if()
    //   // path.node.value.type = 'StringLiteral'
    //   // path.node.value.value = path.node.value.name
    //   console.log(path)
    //   // path.get('properties').pushContainer('properties', ,);
    //   path.node.properties.push(t.objectProperty(t.identifier('path'), t.stringLiteral('xxx')))
    // }
    if(path.isExportDefaultDeclaration()){
      const defaultName = path.node.declaration.name
      const expression = t.expressionStatement(
        t.assignmentExpression(
            "=",
            t.memberExpression(
              t.memberExpression(t.identifier(defaultName), t.identifier('config'))
              , t.identifier('version')
            ),
            t.stringLiteral('0.0.1')
        )
      )
      path.insertBefore(expression)
    }
  }
})

let result = babel.transformFromAstSync(ast)

console.log(result.code)
