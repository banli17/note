// 在一个字符串中找到字符 abcdef
function match(string) {
    let state = start
    for (let c of string) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if (c === 'a') {
        return foundA
    } else {
        return start
    }
}

function foundA(c) {
    if (c === 'b') {
        return foundB
    } else {
        return start
    }
}

function foundB(c) {
    if (c === 'c') {
        return foundC
    } else {
        return start
    }
}

function foundC(c) {
    if (c === 'd') {
        return foundD
    } else {
        return start
    }
}

function foundD(c) {
    if (c === 'e') {
        return foundE
    } else {
        return start
    }
}

function foundE(c) {
    if (c === 'f') {
        return end
    } else {
        return start
    }
}

function end(c) {
    return end
}

let res = match('abcdef i abm groot')
console.log(res)
