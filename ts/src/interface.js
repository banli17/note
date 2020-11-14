function render(result) {
    result.data.forEach(function (value) {
        console.log(value.id, value.name);
    });
}
var result = {
    data: [
        { id: 1, name: 'A', sex: 'male' },
        { id: 2, name: 'B' }
    ]
};
render(result);
// 如果将字面量给 render，则会严格检查
// 不能将类型“{ id: number; name: string; sex: string; }”分配给类型“List”。
// render({
//     data: [
//         {id: 1, name: 'A', sex: 'male'},
//         {id: 2, name: 'B'}
//     ]
// })
// 可以
render({
    data: [
        { id: 1, name: 'A', sex: 'male' },
        { id: 2, name: 'B' }
    ]
});
// 或 ， 但是这个方法在 react 里会产生歧义
render({
    data: [
        { id: 1, name: 'A', sex: 'male' },
        { id: 2, name: 'B' }
    ]
});
