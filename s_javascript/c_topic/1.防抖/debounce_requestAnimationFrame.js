function debounce(fn) {
    var timeout
    return function () {
        cancelAnimationFrame(timeout)
        timeout = requestAnimationFrame(fn)
    }
}
