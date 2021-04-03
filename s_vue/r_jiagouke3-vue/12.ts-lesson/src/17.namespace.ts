// 模块 es6 模块 ，在ts中。依然可以支持此es6语法

// ts中模块分为两种 一种叫内部模块 （命名空间替代了内部模块）  外部模块 import export 

// 命名空间  为了划分作用域 防止变量冲突   在ts中为了解决同一个模块中可能命名冲突

export namespace School1 {
    export class Teacher{}
    export namespace Room {
        export const a = 'room'
    }
}
// namespace School2 {
//     export class Teacher{}
//     const a = 1;
// }

export {}