// 泛型 特性 就是为了 在声明时不能确定类型，只有在使用的时候 才能决定类型
// 函数 接口、类型别名 类

// 函数中使用泛型 
function createArray<T>(times: number, val: T) {
    let result = [];
    for (let i = 0; i < times; i++) {
        result.push(val);
    }
    return result
}
let r = createArray<string>(3, 'ABC'); // 不传入类型 ts 也会自动推到类型

// 泛型可以使用多个
// 元组  [string,numer] => [number,string]
// A,B 代表类型变量
// function swap<A,B>(tuple:[A,B]):([B,A]){
//      return [tuple[1],tuple[0]]
// }
// swap<string,string>(['string','string'])

// 函数表达式的写法
// 写到函数上的泛型表示调用函数时 传入具体类型 ，写在接口后面的标识使用接口时传入类型
// interface MySwap<A, B>{
//      (tuple: [A, B]): [B, A]
// }
// interface IArr<B> {
//     [key:number]:B // 可索引接口
// }
// // 在接口使用时传递参数
///       定义变量(类型)    var b = unkown
// const swap = <B>(tuple:IArr<B>):IArr<B> => {
//     return [tuple[0],tuple[1]]
// }
// let r1 = swap(['2',3,''])   // [key:number]:B    [2,3]

// 求和函数 我希望求合
const sum = <T extends string>(a: T, b: T): T => {
    return (a + b) as T;
}
// 只要传入的两个参数类型一致即可
let r1 = sum<string>('1', '2'); // 1和2 得具备数字的能力 ， 约束T 都是number类型 只要拥有number能加的功能就可以
// 泛型约束  约束泛型的能力

// 我希望你传入的数据 只要是带有length属性的即可
// type WithLen = {length:number}
interface WithLen {
    length: number
}
// T 满足里面的条件
function getType<T extends WithLen>(obj: T) {
    return obj.length
}
let r2 = getType([]);

// 默认泛型 不传递 默认给与类型 
interface DStr<T = string> {
    name: T   // 可能是数组 、 number 、boolean
}
type T1 = DStr
type T2 = DStr<number>
type T3 = DStr<boolean>
let str: T3 = { name: true };


// 约束属性   keyof 表示取对象中的所有key属性 
const getVal = <T extends Object,K extends keyof T>(obj: T, key: K) => {

}
getVal({ a: 1, b: 2 }, 'b');
type t1 = keyof any; // number string symbol
type t2 = keyof string 


class MyArray <T>{
    public arr:T[] = []
    add(v:T){
        this.arr.push(v);
    }
    getMaxNum():T{
        let arr = this.arr;
        let max = arr[0];
        for(let i = 1 ; i< arr.length;i++){
            let current = arr[i];
            current > max ? max = current : void 0;
        }
        return max;
    }
}
let arr = new MyArray<number>()
arr.add(1);
arr.add(3);
arr.add(2);
arr.getMaxNum()


// 当使用时的时候 传入类型

// 1.普通泛型 当用户使用时确定类型 类 函数接口 （定义时不能确定类型）
// 2.约束某个类型必须有此功能
// 3.keyof 取类型中的key 属性


export {}