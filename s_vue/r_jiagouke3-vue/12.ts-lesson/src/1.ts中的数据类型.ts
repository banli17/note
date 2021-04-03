// ts 中拥有的类型

// 1.基础类型

// 数字 字符串 布尔类型
// 所有的类型 : 后面的都是类型 = 后面的都是值

let num:number = 10;
let str:string = 'zf';
let bool:boolean = true;


// 元组  表示长度和个数都 （内容存放类型）都限制好了 
let tuple:[string,number,boolean] = ['zf',11,true];
// 可以像元组中添加内容 ，不能通过索引添加属性
// 只能放入元组中已经声明过的类型
tuple.push(true);


// 数组  存放一类类型的集合 
let arr1:number[] = [1,2,3];
let arr2:string[] = ['1','2'];

// 联合类型可以看作并集  既能使用数字 又能使用字符串
let arr3:(number|string)[] = [1,2,3,'4'];
let arr4:Array<number | string> = [1,2,3,'5'];
// let arr5:any[] = [1,2,3]; // 什么都能方法

// 枚举类型  type
// enum USER_ROLE {
//     USER='a', // 默认下标是从0开始
//     ADMIN=1,
//     MANAGER
// }
// 默认可以正向取出 也可以反举

// 异构枚举 可以在枚举中放不同的类型, 可以通过数字 自动向下推断
// console.log(USER_ROLE[1])

// 常量枚举 只是提供了一个类型
const enum USER_ROLE{ // 语义化
    USER,
    ADMIN
}
console.log(USER_ROLE.USER)


// any 类型 不进行类型检测的类型 相当于没有写类型
let arr:any = ['zf',11,true,{}]; // 能不写any 尽量不写any

// null 和 undefined
// 任何类型的子类型  ,在严格模式下 只能将null 和 undefined 赋予给 null undefined
let str2:number | string |undefined;
str2 = undefined;


// void 空类型 只能接受 null 和undefined 。 一般用于函数的返回值
// 函数默认的返回值是undefined, 默认在严格模式下不能将null 赋给void
// let v:void;
// v = null;



// 字符串 数字 布尔类型 元组 数组 枚举 any null 和 undefiend


// never类型 永远不 是任何类型的子类型 可以把never赋予给任何类型
// 永远达不到的情况有三种 1） 错误  2） 死循环  3） 类型判断时会出现never 4) 完整性保护

function MyError():never{
    throw new Error("");
}
function whileTrue():never{
    while (true) { }
}
function byType(val:string|number){
    if(typeof val == 'string'){
        val
    }else if(typeof val == 'number'){
        val
    }else{
        val // never
    }
}
// let n:never = MyError();


// Symbol BigInt   symbol 表示独一无二 元编程会用到 stringToFlag iterator ....
let s1:symbol = Symbol('123');
let s2 = Symbol('123');
console.log(s1 == s2);



// BigInt
export let num1:bigint = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
let num2 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2);

console.log(Number)


// 对象类型 非原始数据类型 object

const create = (obj:object)=>{

}
// create(1); // 基本类型
// create(null); 
create({})
create([])
create(function(){});

// 默认全局下本来就有name

// string | number | boolean | 数组 | 元组 | never | null | undefined | void 
// symbol bigint   
// object

 export {} // 防止模块间的干扰