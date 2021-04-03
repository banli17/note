
// 什么时候标识类型 什么时候不用标识 

// ts自带类型推到的功能

let name; //当没有赋值的时候 默认是any
name = 'zhufeng'
name = 11;

// 默认在初始化的是会进行类型推倒
let name1 = 'zhufeng';

// ------------------------------

// number Number  string String

// 在使用基本数据类型时   会将原始类型 包装成 对象类型
11..toString() // Number(11).toString()
let number1:number = 11;
let number2:Number = 11;
let number3:number = Number(11); // 11
// let number4:number = new Number(11)// {} 错误语法 不能把实例赋予给基本类型
// 类也是一个类型 他可以描述实例
let number5:Number = new Number(11)

// 标识类型时 使用基本类型  Number实例的类型  Aniaml Person 



class Animal {

}
// :后面的都是类型 标识这个能new
// 类比较特殊可以当成类型 也可以当成值
let A:typeof Animal = Animal

function createInstance(clazz:new ()=>any){

}
createInstance(Animal)


export {}