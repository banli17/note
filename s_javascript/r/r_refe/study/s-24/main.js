let pattern = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
]

function getState(n) {
    return n === 0 ? '' :
        n === 1 ? 'o' :
            'x'
}

let color = 2

function show(pattern) {
    let board = document.getElementById('board')
    board.innerHTML = ''
    pattern.forEach((item, colIndex) => {
        const row = document.createElement('div')
        row.className = 'row'
        item.forEach((t, rowIndex) => {
            const cell = document.createElement('div')
            cell.className = 'cell'
            cell.innerHTML = getState(t)
            cell.addEventListener('click', () => down(rowIndex, colIndex))
            row.appendChild(cell)
        })
        board.appendChild(row)
    })
}

function down(x, y) {
    if (pattern[y][x] !== 0) return  // 有子了
    pattern[y][x] = color
    if (check(pattern, color)) {
        console.log(color == 2 ? 'x  win' : 'o  win');
    }
    color = 3 - color  // 刚好 1 - 2 切换
    show(pattern)
    if (willWin(pattern, color)) {
        console.log(color == 2 ? 'x will win' : 'o will win');
    }
}

function check(pattern, color) {
    // x轴
    for (let i = 0; i < 3; i++) {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (pattern[i][j] !== color) {
                win = false
            }
        }
        if (win) {
            return true
        }
    }
    // y轴
    for (let i = 0; i < 3; i++) {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (pattern[j][i] !== color) {
                win = false
            }
        }
        if (win) {
            return true
        }
    }

    {
        let win = true
        for (let i = 0; i < 3; i++) {
            if (pattern[i][i] != color) {
                win = false
            }
        }
        if (win) {
            return true
        }
    }

    {
        let win = true
        for (let i = 0; i < 3; i++) {
            if (pattern[i][2 - i] != color) {
                win = false
            }
        }
        if (win) {
            return true
        }
    }
    return false
}

function clone(pattern) {
    return JSON.parse(JSON.stringify(pattern))
}

function willWin(pattern, color) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (pattern[i][j] !== 0)
                continue

            let tmp = clone(pattern)
            tmp[i][j] = color
            if (check(tmp, color)) {
                return [i, j]
            }
        }
    }
    return false
}

function bestChoice(pattern, color) {
    let point = willWin(pattern, color)
    if (point) {
        return {
            point,
            result: 1   // 1 胜 0 平 -1 负
        }
    }

    let result = -1
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (pattern[i][j] !== 0) {
                continue
            }
            let tmp = clone(pattern)
            tmp[i][j] = color
            let opp = bestChoice(tmp, 3 - color)
            if (-opp.result >= result) {
                point = [j, i]
                result = -opp.result
            }
        }
    }

    return {
        point,
        result: point ? result : 0
    }
}

show(pattern)