---
title: "typescript"
date: 2019-03-03 12:08:28
tags:
toc: true
---

## 安装

```
npm i -g typescript 

tsc 1.js
tsc --init
```

## 使用

```javascript
/**
 * 数据类型
 * boolean 
 * number  
 * string
 * string[]
 * Array<number>  只有一个参数
 * Array<number|string|boolean> 
 * Array<any> 
 * 元组(tuple): 长度和类型都是不可变的
 * 枚举：事先考虑到一个变量所有可能的值。定义好之后只能取值，方便管理防止出错
 * any
 * null undefined
 * void 表示没有返回值，一般用于函数，不写 return
 * never 代表不会有返回值，比如总是抛出异常，或者没有返回值的死循环函数
 * object
 */


let isMarried: boolean = true
void
    let hobbies: string[] = ['hi', 'yy']

let numbers: Array<number> = [4, 5, 6]

// tuple
let s: [string, number] = ['hello', 3]

// 枚举
enum Gender {
    // BOY
    GIRL = "女孩", // 默认值0
    BOY = "男孩",  //默认值1
}
console.log(Gender.BOY)

// any 任何类型，任何值。放弃检查
let root = document.getElementById('root')
// root.style.color = 'hello'  // 有可能没有root: null

let root1: any = document.getElementById('root')
root1.style.color = 'red'
// 可以用!强制取值
root1!.style!.color = 'blue'

let age: any = 1
age = 'hi'

// null 和 undefined
let x: number | null | undefined
x = 10
x = undefined
x = null

// 没有赋值的变量不能使用
//let y: number
//console.log(y)  // 报错：在未赋值前使用

// 使用了void，但是返回了
// function greeting(name: string): void {
//     console.log(name);
//     return 'ok'  
// }
// function greeting(name: string): string{
//     console.log(name);
//     return 'ok'  
// }
// greeting('hello');


let error: never
error = (() => {
    throw new Error('wrong')
})();

function divide(a:number,b:number):never|number{
    return a/b
}
divide(10/2)
divide(10/0)

let obj: object = { name: 'hi' }

const axfn = () => { }
const ax = axfn()
```

ts里，形参和实参要完全一样。如果不传实参，需要用?表示可选参数。

```
// 可选参数
function greet(name:string,age?:number){
    console.log(name,age) 
}

// 默认参数
function ajax(method:string='get', url:string){}

// 任意参数
function sum(...number:number[]){
    return numbers.reduce((value,item)=> value+item, 0)
}

// 重载，java两个或两个以上的函数，参数的个数或类型不同
// TS的重载，只是检查数据类型，要和声明的一致
function attr(val:string):void
function attr(val:number):void
function attr(val:string|number){
    if(typeof val == 'string'){}
    if(typeof val == 'number'){}
}
function attr(val:any){}  // 也不能传其它类型
```

## 类

类的修饰符
- public 公开的，自己/子类/其它类都能访问
- protected 受保护的 自己/子类能访问，其它人不能访问
- private 私有的 只有自己访问，子类 其它人不能访问

```
class Father{
    public name:string
    protected age:number
    private money:number
    constructor(name,age,money){
        this.name = name
        this.age = age
        this.money = money
    }
}

class Child extends Father{
    getAge(){ return this.age }
    getMoney(){ return this.money} // 报错
}
```

静态属性/静态方法 static

抽象类 abstract: 抽象类和方法不包含具体实现，必须在子类中实现。抽象方法只能出现在抽象类中。

```
abstract class Animal{
    abstract speak():void
}
// 普通类继承抽象类，必须实现抽象类的方法
class Cat extends Animal{
    speak(){}  // 不写会报错
}
```

## 接口

接口是一个约束规范。接口不能加限定符public等，因为本来就是定义给别人用的。

```
function getUserInfo(user:{name:string,age:number}):void{
    console.log(user.name,user.age)
}
function getVipInfo(user:{name:string,age:number}):void{
    console.log(user.name,user.age)
}
getUserInfo({name:'zs',age:10})
getVipInfo({name:'lisi',age:10})


// 使用接口复用，约束对象的格式
interface userInterface{
    name:string,
    age: number,
    home?:string
}
function getUserInfo(user:userInterface):void{}
function getVipInfo(user:userInterface):void{}
getUserInfo({name:'zs',age:10})
getVipInfo({name:'lisi',age:10,home:'china'})

// 函数类型接口：对函数进行约束
interface discount {
    (price:number):number   // 参数是number，返回一个number
}
let count:discount = function(price){}

// 可索引的接口
interface StringArray {
    [index: number]: string
}
let myArray: StringArray = ['hi', 'hello']
console.log(myArray)

// 用接口约束类，用类实现接口，一个类可以实现多个接口，但是不能继承多个类
// 接口可以继承自接口
interface Animal{
    name: string,
    speak(something:string):void
}
interface Bird{
    fly():void
}
interface MachineBird extends Bird{
    machineFly():void
}
class Dog implements Animal,Bird{
    constructor(public name:string){
        this.name = name
    }
    speack(something: string):void{}
    fly(){}
}
```

## 泛型

```typescript
// 需求：函数传入什么类型，返回什么类型。<T>表示传入的类型
function calculate<T>(value:T):T{
    return value    
}
calculate<string>('hello')
calculate<number>(1)

// 类的泛型
class MyArray<T>{
    private list:T[] = []
    add(value:T){
        this.list.push(value)
    }
    max():T{
        // 这里要返回number        
    }
}
let m = new MyArray<string>()
```


