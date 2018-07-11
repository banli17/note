const a = ['angel', 'clown', 'mandarin', 'sturgeon'];

const b = a.splice(1)  // 从1开始的元素全删除

console.log(a, b)  // [ 'angel' ] [ 'clown', 'mandarin', 'sturgeon' ]


const c = a.splice(-1)
console.log(a, c)  // [] [ 'angel' ]