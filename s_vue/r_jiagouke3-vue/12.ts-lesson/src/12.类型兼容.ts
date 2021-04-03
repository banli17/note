// ts中的兼容性  一个类型能否被赋予给另一个类型

// 1.基本数据类型的兼容性
let str1!: string;
let temp!: string | number;

temp = str1;
// str = temp; // 从安全性来考虑

// ts叫鸭子类型检测  结构 只要长得像就可以

interface MyNum {
    toString(): string
}

let str2: MyNum = 'xxx'; // 我要的你有就可以了
let myNum!: MyNum; // 我要的时有toString方法的 你有就可以

// let str3:string = myNum;


// 2.接口类型的兼容性
interface Animal {
    name: string,
    age: number
}
interface Person {
    name: string,
    age: number,
    address: string
}
let animal!: Animal;
let person!: Person;

animal = person; // // 我要的你有就可以了

// 函数  函数的参数、函数的返回值
// 函数的兼容性 参数要求：赋值的函数的参数要小于等于被赋值的函数
let sum1 = (a: string, b: string) => { }
let sum2 = (a: string) => { }

sum1 = sum2;  // forEach

// 自己实现一个forEach
type ForEachFn<T> = (item: T, index: number) => void
function forEach<T>(arr: T[], cb: ForEachFn<T>) {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i);
    }
}
//  能使用接口就用接口，接口用不用别名，没有继承没有扩展就直接用type
forEach<number>([1, 2, 3, 4, 5], function () {
});
// 函数的返回值 (遵循基本类型的特性, 遵循接口特性)
type sum1 = () => { name: string };
type sum2 = () => { name: string, age: number };

let s1!: sum1;
let s2!: sum2;

s1 = s2

// 安全考虑
// 1.基本类型 可以小范围的赋予给大范围的
// 2.接口类型 可以把多的赋予给少的
// 3.函数的兼容性 (函数的参数 函数的返回值) 
// 1)函数的参数:可以把参数少的函数赋予给参数多的函数
// 2)函数的返回值遵循 （1,2,3）

// ） 逆变 （函数的参数可以逆变 可以传递父类和自己） 协变（函数的返回值 可以传递子类和自己
// 参数是双向协变 就是可以传儿子 也可以传父亲 （默认在严格模式下不支持）
class Parent {
    address: string = '回龙观'
}
class Child extends Parent {
    money: number = 100;
}
class Grandson extends Child {
    name: string = 'Tom'
}
// 传父反子
// function getFn(cb:(person:Child)=>Child){}
// getFn((person:Parent)=>new Grandson);

// 类的兼容性 两个类一样就兼容

class Person1 {
    name: string = 'zf'
}

class Person2 {
    name: string = 'zf'
}
let p1!: Person1
let p2!: Person2 // 实例的特点 还是遵循正常的兼容性 , 比较的是实例长得什么样 =》 接口的兼容性
p1 = p2;

// 如果类中出现了 private protected 永远不兼容
// 枚举类型永远不兼容
enum E1 {

}
enum E2{

}
let e1!:E1
let e2!:E2
// e1 = e2; 

// 泛型 根据最终结果来确定是否 兼容 （返回的结果一样就兼容）
interface A<T>{
    [key:number]:T
}
interface B<T>{
    [key:number]:T
}
type A1 = A<string>
type B1 = B<number>
let a1!:A1;
let a2!:B1;

// a1 = a2

// 基本类型 
// 接口兼容性
// 函数的兼容性 参数（可以少的给多的） 返回值  逆变和协变 传父反子
// 类的兼容性 =》实例
// 枚举不兼容
// 泛型看最终结果是否兼容


// ts 是为了更安全

export { }
