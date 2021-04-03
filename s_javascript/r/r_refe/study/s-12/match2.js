// 在一个字符串中找到字符ab
function match(string) {
    let foundA = false
    for (let c of string) {
        if (c === 'a') {
            foundA = true
        } else if (c === 'b') {
            return true
        } else {
            foundA = false
        }
    }
    return false
}

let res = match('i abm groot')
console.log(res)
