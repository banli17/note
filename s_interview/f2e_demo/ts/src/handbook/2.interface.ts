// 这里子对象只能写必须的属性，没有该属性会报错
// function printLabel(labeledObj: { label: string, size: number }) {
//     console.log(labeledObj.label);
// }
//
// let myObj = {size: 10, label: "Size 10 Object"};
// printLabel(myObj);

/**
 * 接口 interface
 * 2. 可选属性 ?
 * 3. 只读 readonly，不能重新赋值，
 * 4.
 */

interface LabeledValue {
    label?: string
    size?: number

    // 下面两个属性等效
    readonly arr?: object[]
    arr2?: ReadonlyArray<object>  // ReadonlyArray 分配给 普通数组也会报错，但是可以用断言 `a = arr as arr2`

}

function printLabel(labeledObj: LabeledValue): { color: string; area: number } {
    console.log(labeledObj.label);
    return {
        color: '#fff',
        area: 12
    }
}

let myObj = {size: 12, label: "Size 10 Object"};
printLabel(myObj);

