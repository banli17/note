// 遍历 document
// 广度优先
function traverse(el) {
    var els = []
    let i = 0
    let cur
    els.push(el)

    // 如果 el有 children，就将children 放进去
    while (cur = els[i]) {
        if (!cur.children) break
        els.push(...cur.children)
        i++
    }

    return els
}

const a = traverse(document)

console.log(a)