// 遍历 document
// 广度优先
function traverse(el) {
    var els = []
    els.push(el)
    if (el.children) {
        for (let i = 0; i < el.children.length; i++) {
            els.push(...traverse(el.children[i]))
        }
    }
    return els
}

const a = traverse(document)

console.log(a)