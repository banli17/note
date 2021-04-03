function debounce(func, wait, immediate) {
    let timeout, result
    let debounced = function (...args) {
        const context = this
        if (timeout) clearTimeout(timeout)

        if (immediate) {
            // 没有 timeout 说明还没有执行过
            let callNow = !timeout
            timeout = setTimeout(() => {
                func.apply(context, args)
                timeout = null
            }, wait)

            // 有 timeout 就不会执行
            if (callNow) {
                result = func.apply(context, args)
            }
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait)
        }
        return result
    }

    debounced.cancel = function () {
        clearTimeout(timeout)
        timeout = null
    }

    return debounced
}

//
// let dfn = debounce(() => {
//     console.log(1)
// })
// for (let i = 0; i < 10000000; i++) {
//     dfn()
// }
