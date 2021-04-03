//  内置类型 （转化类型）

// 1)  部分属性
interface Company {
    name: string,
    age: number,
    address: string,
}
interface Person {
    name?: string,
    age: number,
    company: Company
}
// 将所有属性 变为可选属性
// type Partial<T> = { [K in keyof T]?: T[K] }
// type MyPerson = Partial<Person>

//                      取出类型中key 进行依次循环 ,如果值是对象 就递归当前值 再次转换成可选的
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }

let person: DeepPartial<Person> = { company: {} }

// 实现一个深层次的嵌套树类型 children 可能就是可有可无

// 必填属性 -? 把所有属性拿出来减去所有可选部分
type Required<T> = { [K in keyof T]-?: T[K] }
type Readonly<T> = { readonly [K in keyof T]: T[K] }
type MyPerson = Readonly<Person>


// Pick 精挑细选


// 抽离 多个选某几个  Pick 是从某个类型中挑选属性
type Pick<T, K extends keyof T> = { [X in K]: T[X] }
///          限制当前K中的类型 必须是person中的属性
type PickPerson = Pick<Person, 'name' | 'age'>


// Record记录
// 对象中的key 必须得是 string|number|symbol
// type Record<K extends keyof any, T> = {
//     // [key:string]:any   // 其实就是一个任意类型，只是能标识出 这个对象的返回值类型而已
//     // [key:number]:any
//     [P in K]: T;
// };
let obj: Record<string | number, any> = { name: 'zf', age: 11 }

// extends typeof  keyof  in
// map 方法
// name, age = T
// zf  11 = K
// u函数的返回值
type Fn<K, T, U> = (item: K, key: T) => U
// 定义泛型                            对象参数            回调函数参数                  返回值类型
function map<K, T extends keyof any, U>(obj: Record<T, K>, cb: Fn<K, T, U>): Record<T, U> {
    let result = {} as Record<T, U>;
    for (let key in obj) {
        result[key] = cb(obj[key], key);
    }
    return result
}
//  extends keyof any = string | number | symbol
//          Record<T, K>
let r = map({ name: 'zf', age: 11 }, (item, key) => {
    return 123
})
// r => {name:'zfok',age:'11ok'}

// Omit忽略属性  我希望有三个属性都是必填的，但是我希望把某个属性改成选填的

interface IPerson {
    name: string,
    age: number,
    company: Company
}
// type Omit<T,K extends keyof any> = Pick<T,Exclude<keyof T,K>>; // 排除company
type iperson = Omit<IPerson,'xxx'>;

// Exclude Extract Required Readonly Partial Omit Pick
// Record ReturnType instanceType ParamatersType....


export { }