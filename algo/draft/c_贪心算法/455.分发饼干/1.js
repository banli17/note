var findContentChildren = function (g, s) {
    function fn(a, b) {
        return a - b
    }

    let i = 0
    g.sort(fn)
    s.sort(fn)
    console.log(g, s)
    s.forEach(n => {
        if (n >= g[i]) {
            i++
        }
    })
    return i
};
