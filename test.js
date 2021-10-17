const fs = require('fs')
const path = require('path')
const str = fs.readFileSync(path.resolve(__dirname, './a.js'), 'utf-8')

function parseJs(str) {
    const reg = new RegExp('class\\s+A([\\s\\S]+?)static\\s+config\\s*=\\s*(?={)')
    const ret = reg.exec(str)
    const len = str.length
    const stack = []
    const start = ret[0].length + ret.index
    let end
    let i = start
    let char
    while (i < len) {
        char = str[i]
        // 移除引号中的大括号, 如'}}'
        if (char === "'" || char === '"') {
            for (let j = i; j < len; j++) {
                if (char === str[j]) {
                    i = j + 1
                }
            }
        }
        if (char === '{') {
            stack.push(char)
        }
        if (char === '}') {
            stack.pop()
        }
        if (stack.length === 0) {
            end = i + 1
            break
        }
        i++
    }
    console.log('str.slice(start, end)', str[start], str[end], str.slice(start, end))
    return eval('(' + str.slice(start, end) + ')')
}

console.log(parseJs(str))
