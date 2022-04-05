const WIN_WIDTH = window.innerWidth
const WIN_HEIGHT = window.innerHeight
const MARGIN_LEFT = 0
const MARGIN_TOP = 0
const RADIUS = 8
const endTime = new Date(2021, 11, 6, 12, 22, 31)
let curShowTimeSeconds

window.onload = () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = WIN_WIDTH
    canvas.height = WIN_HEIGHT

    curShowTimeSeconds = getCurShowTimeSeconds()

    setInterval(() => {
        render(ctx)
        update()
    }, 50)
}

function update() {
    let nextShowTimeSeconds = getCurShowTimeSeconds()
    if (nextShowTimeSeconds !== curShowTimeSeconds) {
        curShowTimeSeconds = nextShowTimeSeconds
    }
}

// 获取倒计时秒数
function getCurShowTimeSeconds() {
    const curTime = new Date
    let ret = endTime.getTime() - curTime.getTime()

    ret = Math.round(ret / 1000)
    return ret >= 0 ? ret : 0
}

function render(ctx) {
    ctx.clearRect(0, 0, WIN_WIDTH, WIN_HEIGHT)
    const hours = parseInt(curShowTimeSeconds / 3600)
    const minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60)
    // const seconds = curShowTimeSeconds - hours * 3600 - minutes * 60
    const seconds = curShowTimeSeconds % 60

    console.log(hours, minutes, seconds)

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx)
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx)
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx)
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx)
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx)
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx)
}

function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = 'red'

    console.log(digit[num])
    const n = digit[num]
    for (let i = 0; i < n.length; i++) {
        for (let j = 0; j < n[0].length; j++) {
            if (n[i][j] === 1) {
                ctx.beginPath()
                const centerX = x + j * 2 * (RADIUS + 1) + (RADIUS + 1)
                const centerY = y + i * 2 * (RADIUS + 1) + (RADIUS + 1)
                ctx.arc(
                    centerX,
                    centerY,
                    RADIUS,
                    0,
                    2 * Math.PI,
                )
                console.log(centerX, centerY)
                ctx.closePath()
                ctx.fill()
            }
        }
    }

}
