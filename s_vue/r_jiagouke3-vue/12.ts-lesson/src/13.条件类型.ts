
// 条件类型 js三元表达式 
// ts中很多的内置类型 HTMLElement ....

interface Bird {
    name1: string,
}
interface Sky {
    sky: string
}
interface Fish {
    name2: string
}
interface Swiming {
    swim: string
}
// 泛型约束 约束这个人是否满足他的特性 满足就为true 我要的你都有
type MyType<T> = T extends Bird ? Sky : Swiming; // 三元表达式 (ts中的语法)
//  条件的分发  Sky | Swiming 只有"联合"类型会进行分发操作，最终取联合类型
type x = MyType<Fish | Bird>


// 内置类型 (现在说的都是基于条件类型)

// Exclude类型的排除
type Exclude<T, U> = T extends U ? never : T;
type MyExclude = Exclude<string | number | boolean, boolean>;

// Extract 抽离类型
type Extract<T, U> = T extends U ? T : never;
type MyExtract = Extract<string | number, boolean>

// 非null|undefind检测
type NonNullable<T> = T extends null | undefined ? never : T
type MyNonNullable = NonNullable<string | number | null | boolean>

//  类型推导 infer
// 1.查看函数返回值的类型 
function getUser(x:string,y:string) {
    return { name: 'zf', age: 11 }
}
// 不执行函数 取类型 infer 写在哪里就推导哪里的类型
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer X ? X : 123
type MyReturnType = ReturnType<typeof getUser>

//                 我传入的类型需要是一个函数        如果是函数     将参数类型推导出来塞入到变量P ？ 返回P中           返回p
type Parameters<T extends ((...args: any[]) => any)> = T extends ((...args: infer P) => any) ? P : never
type MyParamsType = Parameters<typeof getUser>


// 取构造函数类型 参数类型
class Animal {
    constructor(name:string,age:number){}
}
// let A:typeof Animal =Animal
type ConstructorParameters<T extends {new (...args:any[]):any}> = T extends {new (...args:infer C):any}?C:any

//Animal 可以描述实例的类型
type MyConstructor = ConstructorParameters<typeof Animal>

type InstanceType<T extends {new (...args:any[]):any}> = T extends {new (...args:any[]):infer R}?R:any
type MyInstance = InstanceType<typeof Animal>


// 交叉类型
// interface Person1 {
//     handsome:string
// }
// interface Person2 {
//     high:string
// }
// type Person3 = Person1 & Person2
// let p1!:Person1;
// let p2!:Person2;
// let p3!:Person3;

// p1 = p3;
// p2 = p3

export { };