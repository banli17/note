// 在一个字符串中找到字符a
function match(string) {
    for (let c of string) {
        if (c === 'a') {
            return true
        }
    }
    return false
}

let res = match('i am groot')
console.log(res)
