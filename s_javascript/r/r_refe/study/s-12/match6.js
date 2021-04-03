// KMP 自动状态机实现
// 在一个字符串中找到字符 pattern
function match(pattern, string) {
    let stateMap = createState(pattern)
    let state = stateMap['found_' + pattern[0]]
    for (let c of string) {
        state = state(c)
    }
    return state === end
}

function createState(pattern) {
    let all = {}
    for (let i = 0; i < pattern.length; i++) {
        all['found_' + pattern[i]] = function (c) {
            if (i === pattern.length - 1) {
                return end
            } else if (c === pattern[i]) {
                return all['found_' + pattern[i + 1]]
            } else {
                return all['found_' + pattern[0]]
            }
        }
    }
    console.log(all)
    return all
}

function end(c) {
    return end
}

let res = match('aca', 'abcacacabxdef i abm groot')
console.log(res)
