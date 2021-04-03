function throttle_with_datenow(func, wait) {
    let previous = 0
    return function (...args) {
        // console.log('Date.now() - timestamp', Date.now() - timestamp)
        if (Date.now() - previous > wait) {
            func.apply(this, args)
            previous = Date.now()
        }
    }
}

function throttle_with_timeout(func, wait) {
    let timeout
    return function (...args) {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                func.apply(this, args)
            }, wait)
        }
    }
}


// timeout 立即执行版本
function throttle_with_timeout_immediate(func, wait) {
    let timeout
    return function (...args) {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            func.apply(this, args)
        }
    }
}

function throttle(func, wait, options = {}) {
    let previous = 0
    let timeout
    let remaining  // 剩余触发时间
    const throttled = function (...args) {
        // 剩余触发时间
        const now = Date.now()
        if (!previous && options.leading === false) {
            previous = now
        }
        remaining = wait - (now - previous)

        if (remaining <= 0 || remaining > wait) {
            // 立即执行，如果有 timeout，清除了再执行
            // 因为定时器并不是准确的时间，很可能你设置了2秒
            // 但是他需要2.2秒才触发，这时候就会进入这个条件
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            func.apply(this, args)
            previous = Date.now()
            // 立即执行
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(() => {
                func.apply(this, args)
                timeout = null
                previous = options.leading === false ? 0 : Date.now()
            }, wait)
        }
    }
    throttled.cancel = function () {
        clearTimeout(timeout)
        previous = 0
        timeout = null
    }
    return throttled
}

// 这个版本较为清晰
// function throttle_simple(fn: Function, delay: number, immediate: boolean): Function {
//     var timer: number = null
//     var start: number = +new Date()
//     return function (): void {
//         window.clearTimeout(timer)
//         var context: Function = this
//         var now: number = +new Date()
//         var arr: void[] = []
//         var result: void = null
//         for (var i: number = 0; i < arguments.length; i++) arr.push(arguments[i])
//         // 是否需要立即执行
//         if (immediate) {
//             // 只执行第一次
//             immediate = false
//             fn.apply(context, arr)
//         } else {
//             if (now - start >= delay) {
//                 start = now
//                 result = fn.apply(context, arr)
//             } else {
//                 // 函数脱离事件后仍然会执行
//                 timer = window.setTimeout(function () {
//                     fn.apply(context, arr)
//                 }, delay)
//             }
//         }
//         return result
//     }
// }
