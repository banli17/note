// 不能放字符串，因为后缀可能会是当前字符串
const EOF = Symbol("EOF")  // EOF: end of file
let currentToken = null
let currentAttribute = null

let stack = [{type: 'document', children: []}]
let currentTextNode = null

function data(c) {
    if (c === '<') {
        return tagOpen
    } else if (c === EOF) {
        emit({
            type: "EOF"
        })
        return
    } else {
        emit({
            type: "text",
            content: c
        })
        return data
    }
}

function tagOpen(c) {
    if (c.match(/^[a-zA-Z!]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c === '/') {
        return endTagOpen
    } else {
        emit({
            type: "text",
            content: c
        })
        return
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c == '>') {
        emit(currentToken)
        return
    } else if (c === EOF) {
    } else {

    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]/)) {
        return beforeAttributeName
    } else if (c === '/') {
        return selfClosingStartTag
    } else if (c === '>') {
        emit(currentToken)
        return data
    } else if (c.match(/^[a-zA-Z!_-]/)) {
        currentToken.tagName += c
        return tagName
    } else {
        return tagName
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c)
    } else if (c === '=') {

    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c == '>' || c === EOF) {
        return afterAttributeName(c)
    } else if (c === '=') {
        return beforeAttributeValue
    } else {
        currentAttribute.name += c
        return attributeName
    }
}

function afterAttributeName(c) {
    console.log('afterAttributeName--------', c)
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName
    } else if (c === '/') {
        return selfClosingStartTag
    } else if (c === '=') {
        return beforeAttributeValue
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else {
        currentToken[currentAttribute.name] = currentAttribute.value
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeValue
    } else if (c === '"') {
        return doubleQuoteAttributeValue
    } else if (c === "'") {
        return singleQuoteAttributeValue
    } else {
        return unquotedAttributeValue
    }
}

function doubleQuoteAttributeValue(c) {
    if (c === '"') {
        return afterQuotedAttributeValue
    } else {
        currentAttribute.value += c
        return doubleQuoteAttributeValue
    }
}

function singleQuoteAttributeValue(c) {
    if (c === "'") {
        return afterQuotedAttributeValue
    } else {
        currentAttribute.value += c
        return singleQuoteAttributeValue
    }
}

function unquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else {
        currentAttribute.value += c
        return unquotedAttributeValue
    }
}

function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c === '/') {
        return selfClosingStartTag
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c === '=') {
        return beforeAttributeName
    } else {
        return beforeAttributeName
    }
}


function selfClosingStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true
        emit(currentToken)
        return data
    } else if (c === EOF) {

    } else {

    }
}

function emit(token) {
    let top = stack[stack.length - 1]

    if (token.type === 'startTag') {
        console.log('emit', token)
        let element = {
            type: 'element',
            children: [],
            attributes: []
        }

        element.tagName = token.tagName
        for (let p in token) {
            if (p != 'type' || p != 'tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        top.children.push(element)

        if (!token.isSelfClosing) {
            stack.push(element)
        }
        currentTextNode = null
    } else if (token.type === 'endTag') {
        if (top.tagName !== token.tagName) {
            console.log(top.tagName, token.tagName)
            throw new Error("Tag start end doesn't match!")
        } else {
            stack.pop()
        }
        currentTextNode = null
    } else if (token.type === 'text') {
        if (currentTextNode === null) {
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
}


// 接受 html 文本作为参数，返回 DOM 树
function parseHTML(html) {
    let state = data
    for (let c of html) {
        // console.log(c, state.name)
        state = state(c)
    }
    state = state(EOF)

    return stack[0]
}


const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Document</title>
</head>
<body>
你好朋友
</body>
</html>
`

console.log(parseHTML(html))
