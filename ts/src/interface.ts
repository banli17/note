interface List {
    id: number;
    name: string;
}

interface Result {
    data: List[]
}

function render(result: Result) {
    result.data.forEach((value) => {
        console.log(value.id, value.name)
    })
}

let result = {
    data: [
        {id: 1, name: 'A', sex: 'male'},
        {id: 2, name: 'B'}
    ]
}

render(result)

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
        {id: 1, name: 'A', sex: 'male'},
        {id: 2, name: 'B'}
    ]
} as Result)
// 或 ， 但是这个方法在 react 里会产生歧义
render(<Result>{
    data: [
        {id: 1, name: 'A', sex: 'male'},
        {id: 2, name: 'B'}
    ]
})

// 或者
interface List0 {
    readonly id: number; // 只读属性，不能修改
    name: string;
    // [x string]: any;  可以有任意其它属性
    age?: number; // 可选属性
}

// 字符串数组
interface StringArray {
    [index: number]: string
}

let chars: StringArray = ['A', 'B']

interface Names {
    [x: string]: string
    // y: number 不允许在设置特定了
    [z: number]: string  // 数字索引类型的类型要是x的子类型(string any null 等)，因为数字索引会转为字符串
}


// 函数类型接口
let add: (x:number, y: number) => number
interface Add2 {
    (x: number, y: number) : number
}
// 类型别名: 为函数类型起名
type Add = (x: number, y: number) => number
let add3: Add = (a, b)=> a + b

// 混合接口
interface Lib {
    (): void;  // 指明 Lib 是一个函数
    version: string;
    doSomething(): void;
}

function getLib(){
    let lib: Lib = (()=>{}) as Lib;  // 还是缺少属性，使用 as 类型断言
    lib.version = '1.1'
    lib.doSomething = ()=>{}
    return lib;
}
let lib1 = getLib()
