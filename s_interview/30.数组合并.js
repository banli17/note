let a = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
let b = ['A', 'B', 'C', 'D']
//['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']


let c = []
for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
        if (!a[i].startsWith(b[j])) {
            c.push(b[j])
            break
        }
        c.push(a[i])
    }
}
console.log(c)