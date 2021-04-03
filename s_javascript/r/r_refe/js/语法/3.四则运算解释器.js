/**
 * 分析
 * 1. 定义四则运算：产出四则运算的词法定义和语法定义
 * 2. 词法分析：把输入的字符流解析成 token
 * 3. 语法分析：把 token 变成 AST
 * 4. 解释执行：后序遍历 AST，执行得到结果
 */

// 1 + 2 * 3   元素  char Number  

let token = []
let tokens = []

const start = char => {
    if (typeof char === 'symbol') {
        emitToken('EOF')
        return start
    }
    if (char === '.') {
        token.push(char)
        return inNumber
    }

    if (char === '1' || char === '2' || char === '3' || char === '4' || char === '5' || char === '6' || char === '7' || char === '8' || char === '9' || char === '0') {
        token.push(char)
        return inNumber
    }

    if (char === '+' || char === '-' || char === '*' || char === '/') {
        emitToken(char, char)
        return start
    }

    if (char === ' ' || char === '\r' || char === '\n') {
        return start
    }
}

function inNumber(char) {
    if (char === '1' || char === '2' || char === '3' || char === '4' || char === '5' || char === '6' || char === '7' || char === '8' || char === '9' || char === '0' || char === '.') {
        token.push(char)
        return inNumber
    } else {
        emitToken('Number', token.join(''))
        token = []
        return start(char)
    }
}

function emitToken(type, value) {
    tokens.push({
        type,
        value
    })
}



// var tokens = [{
//     type: "Number",
//     value: "1024"
// }, {
//     type: "+",
//     value: "+"
// }, {
//     type: "Number",
//     value: "2"
// }, {
//     type: "*",
//     value: "*"
// }, {
//     type: "Number",
//     value: "256"
// }, {
//     type: "EOF"
// }];

// token 转 ast
// AdditiveExpression + EOF  -> Expression


/**
 *   [{type: 'AdditiveExpression', children:[]}]
 *   [{type: 'AdditiveExpression', children:[], operator:'+'}]
 */
function Expression(source) {
    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === 'EOF') {
        let node = {
            type: 'Expression',
            children: [source.shift(), source.shift()]
        }
        source.unshift(node)
        return node
    }
    AdditiveExpression(source)
    return Expression(source)
}

function AdditiveExpression(source) {
    if (source[0].type === 'MultiplicativeExpression') {
        let node = {
            type: 'AdditiveExpression',
            children: [source[0]]
        }
        source[0] = node
        return AdditiveExpression(source)
    }
    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '+') {
        let node = {
            type: 'AdditiveExpression',
            operator: '+',
            children: []
        }
        node.children.push(source.shift())
        node.children.push(source.shift())
        MultiplicativeExpression(source) // why
        node.children.push(source.shift())
        source.unshift(node)
        return AdditiveExpression(source)
    }
    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '-') {
        let node = {
            type: 'AdditiveExpression',
            operator: '-',
            children: []
        }
        node.children.push(source.shift())
        node.children.push(source.shift())
        MultiplicativeExpression(source) // why
        node.children.push(source.shift())
        source.unshift(node)
        return AdditiveExpression(source)
    }
    if (source[0].type === 'AdditiveExpression') { // EOF
        return source[0]
    }
    MultiplicativeExpression(source)
    return AdditiveExpression(source)
}

function MultiplicativeExpression(source) {
    if (source[0].type === 'Number') {
        let node = {
            type: 'MultiplicativeExpression',
            children: [source[0]]
        }
        source[0] = node
        return MultiplicativeExpression(source)
    }
    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '*') {
        let node = {
            type: 'MultiplicativeExpression',
            operator: '*',
            children: []
        }
        node.children.push(source.shift())
        node.children.push(source.shift())
        node.children.push(source.shift())
        source.unshift(node)
        return MultiplicativeExpression(source)
    }
    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '/') {
        let node = {
            type: 'MultiplicativeExpression',
            operator: '/',
            children: []
        }
        node.children.push(source.shift())
        node.children.push(source.shift())
        node.children.push(source.shift())
        source.unshift(node)
        return MultiplicativeExpression(source)
    }
    // why
    if (source[0].type === 'MultiplicativeExpression') {
        return source[0]
    }
    return MultiplicativeExpression(source)
}

function evaluate(node) {
    if (node.type === 'Expression') {
        return evaluate(node.children[0])
    }
    if (node.type === 'AdditiveExpression') {
        if (node.operator === '-') {
            return evaluate(node.children[0]) - evaluate(node.children[2])
        }
        if (node.operator === '+') {
            return evaluate(node.children[0]) + evaluate(node.children[2])
        }
        return evaluate(node.children[0])
    }
    if (node.type === 'MultiplicativeExpression') {
        if (node.operator === '*') {
            return evaluate(node.children[0]) * evaluate(node.children[2])
        }
        if (node.operator === '/') {
            return evaluate(node.children[0]) / evaluate(node.children[2])
        }
        return evaluate(node.children[0])
    }
    if (node.type === 'Number') {
        return Number(node.value)
    }
}

function parser(input) {
    // console.log('tokens:', tokens)
    // 清空 token tokens

    // 1 放入 token,0 放入 token 2 放入 token 4 放入token  空格 发射 token，token 清空
    // 2 + 放入 token 空格 发射
    let state = start

    for (let c of input.split('')) {
        state = state(c)
    }
    state(Symbol('EOF'))

    let ast = Expression(tokens)
    // console.log(ast)
    let result = evaluate(ast)

    console.log(`${input} expression result is: ${result}`)
    // 计算完成后，清空 tokens
    token = []
    tokens = []
    return result
}

module.exports = parser