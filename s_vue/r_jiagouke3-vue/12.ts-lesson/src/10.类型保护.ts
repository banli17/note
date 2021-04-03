// 类型保护  具体到某个类型 类型判断

// js 1.typeof  

function getVal(val: string | number) {
    if (typeof val === 'string') {
        val.padStart
    } else {
        val.toFixed
    }
}
// 2.instanceof 
class Dog { }
class Cat { }
type Clazz = new () => Dog | Cat
let getInstance = (clazz: Clazz) => {
    return new clazz
}
let instance = getInstance(Dog);
if (instance instanceof Dog) {
    instance
} else {
    instance
}

// in操作符
// interface Fish {
//     swiming: string
// }
// interface Bird {
//     fly: string
// }
// function getType(animal: Fish | Bird) {
//     if ('swiming' in animal) {
//         animal
//     } else {
//         animal
//     }
// }


/// ------------------------- ts 特有 可辨识的类型
interface IButton1 {
    class: 'warning', // 字面量类型
    click: string
}
interface IButton2 {
    class: 'success',
    mouseove: string
}
function getButton(val: IButton1 | IButton2) {
    if (val.class === 'warning') { // warning 是具体的字符串
        val.click
    } else {
        val.mouseove
    }
}

// is 语法 自定义类型
interface Fish {
    swiming: string
}
interface Bird {
    fly: string
}
function isFish(animal: Fish | Bird): animal is Fish { // 为了识别类型而已 ts 语法
    return 'swiming' in animal
}
function getType(animal: Fish | Bird) {
    if (isFish(animal)) {
        animal.swiming
    } else {
        animal.fly
    }
}
// null 保护  ! 非空断言
function getNum(val?: number | null) {
    val = val || 10.1; // 缩小使用范围
    function a() { // ts中无法检测内部函数变量, 需要再次进行判断
        if (val != null) {
            val.toFixed
        }
    }
    a();
}
getNum();

// 对代码的完整性进行保护 反推代码 never 

interface ICircle {
    kind: 'circle',
    r: number
}
interface IRant {
    kind: 'rant',
    width: number,
    height: number
}
interface ISquare {
    kind: 'square',
    width: number
}

const assert = (obj: never) => { throw new Error("出问题了");
 }
const getArea = (obj: ICircle | IRant | ISquare) => {
    switch (obj.kind) {
        case 'rant':
            return obj.width * obj.height;
        case 'square':
            break
        case 'circle':
            break
        default:
            return assert(obj); // 为了实现完整性保护
    }
}

getArea({kind:'square',width:100})

// typeof  instanceof  in  is语法
// 可辨识类型

export { }