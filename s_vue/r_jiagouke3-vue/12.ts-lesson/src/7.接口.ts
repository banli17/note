// 接口 描述对象的形状 ， 根据接口 提供一些新的类 为别人使用

// 计算fullname = firstName + lastName


// 接口可以被实现 被继承 type不能 
// type可以写联合类型 

// 1) 描述对象
// 能用接口用接口，不能用换成type
// interface IFullName {
//     firstName:'张'|'赵',
//     lastName:string
// } 
// // interface 可以描述 （属性 方法 类） 

// const fullName = (obj:IFullName):IFullName =>{
//     return obj
// }
// fullName({firstName:'z',lastName:'f'})

// 2) 描述函数
// interface IFullName {
//     (firtName: string, lastName: string): string;
// }

// const fullName = (firtName: string, lastName: string): string => {
//     return firtName + lastName
// }

// 混合类型 计数器  一个函数返回一个函数，返回的函数有属性
// interface ICount {
//     count:number,
//     ():number,

// }
// const fn:ICount = () => {
//     return ++fn.count
// }
// fn.count = 0
// console.log(fn())
// console.log(fn())


// 接口特性

// interface IVegetables {
//     taste: string,
//     color: string,
// }
// 1) 如果我定义的值比接口中的多可以采用 类型断言 直接断言成对应的接口 
// const tomato:IVegetables = ({
//     size:10,
//     taste:'sour',
//     color:'red'
// } as IVegetables);
// 2) interface IVegetables { // 多个同名接口会进行合并操作
//     size:number
// }
// 3) 接口可以扩展
// interface Itomato extends IVegetables {
//     size:number
// }
// const tomato:Itomato = {
//     size:10,
//     taste:'sour',
//     color:'red'
// };
// console.log(tomato)
// -------------------------------------------


// interface IVegetables {  // 可选属性 仅读属性  
//     taste: string,
//     color: string | number,
//     readonly [xxx:string]:any  // 限制死的 其他的随意  任意接口
//     // readonly size?:number,
//     // type?:string
// }
// const tomato: IVegetables = {
//     type:'fruit',
//     taste:'sour',
//     color: 'red',
//     [Symbol(1)]:1
// };

// // 如果 接口中 [xxx:index] 可索引接口 
// interface IArr {
//     [key:number]:any
// }
// let arr:IArr = [1,{},'a','v']

// -----------------------------
// 接口可以被类来实现
interface Speakable { // 接口中的内容都是抽象，没有具体的实现
    name: string | string,
    speak(): number // 描述类的原型方法 , 表示不关心方法的返回值
}
interface ChineseSpeakable {
    speak(): number
}
class Speak implements Speakable, ChineseSpeakable {
    speakChinese(): void {
        throw new Error("Method not implemented.");
    }
    name!: string;
    speak(): number {
        return 1
    }
}

// 类 抽象类 不能被实例化 只有抽象类里面的内容 可以标记abstract 子类也必须要实现
abstract class Animal { // 抽象类中可以包含抽象方法和抽象属性
    abstract name:string // 可以没有实现
    eat(){ // 有实现
        console.log('eat')
    }
}
//  父类一般都不会被实例化
class Tom extends Animal {
    name!: string;
 
}

// --------------------------------------------
// 可以描述对象 函数 类  类的实例

class Person { // 给这个person增加了属性
    // name:string
    constructor(public name:string) {
        this.name = name
    }
}
interface IClass<T>{ // 表示是一个构造函数类型
    new (name:string):T  // 可以用类当成类型
}
// {(name:string):any}
// new (name:string)=>any
function createInstance<T>(clazz:IClass<T>,name:string){
    return new clazz(name)
}
let r = createInstance<Person>(Person,'张三');

// 泛型 就是当调用时传入具体类型 先用一个标识来占位



// 1.接口可以被扩展 extends
// 2.接口可以描述形状 对象、函数、类 （？ readonly） 
// 3.任意类型 可索引的
// 4.接口和抽象类的区别 

// 描述形状的，没有具体的实现

export { };