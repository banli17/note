{
    // 类型推断
    let a = 1;  // let a: number

    // strictNullChecks: true 将 null 单独分类，false 作为其它类型的子类型
    let b = [1, null]; 
    // 默认为 true let b: (number | null)[]
    // false let b: (number)[]

    // let c: (x?: number) => number
    let c  = (x = 1) => x+1 // (parameter) x: number


    window.onkeydown = (event) => {
        console.log(event.button)  // event 没有 button 属性
    }

    interface Foo{
        bar: number
    }
    // let foo = {} as Foo //类型断言,明确高速 ts 是什么类型
    // foo.bar = 1

    // 推荐初始化时指定类型并赋值
    let foo: Foo = {
        bar : 1
    }


}

{
    // 类型兼容
    let a: string = 'hello'
    a = null

    // 接口兼容
    interface X {
        a: any;
        b: any;
    }
    interface Y {
        a: any;
        b: any;
        c: any;
    }
    let x : X = {a: 1, b: 2}
    let y: Y = {a: 1, b: 2, c: 3}
    x = y
    y = x


    // 函数兼容性
    type Handler = (a: number, b: number) => void
    function hof(handler: Handler){
        return handler
    }

    // 1) 参数个数
    let handler1 = (a: number) =>{}
    hof(handler1)
    let handler2 = (a: number, b: number, c: number) =>{}
    // hof(handler2)

    // 可选参数和剩余参数
    let d = (p1: number, p2: number) => {}
    let e = (p1?:number, p2?:number) => {}
    let f = (...args: number[]) => {}
    d = e
    d = f
    e = f
    f = e

    interface Point3D {
        x: number;
        y: number;
        z: number;
    }

    interface Point2D {
        x: number;
        y: number;
    }

    let p3d = (point: Point3D) => {}
    let p2d = (point: Point2D) => {}
    p3d = p2d;
    p2d = p3d;  // "strictFunctionTypes": false

    // 返回值类型
    let g = () => ({name: 'hi'})
    let h = () => ({name:'hi', age: 12})
    g = h
    // h = g 

}
function overload(a: number,b: number): number
function overload(a: string,b: string): string
function overload(a: any,b: any): any{}  // 实现

// 枚举兼容性
enum Fruit {Apple, Banana}
enum Color {Red, Yellow}
let fruit: Fruit.Apple = 3
let no: number = Fruit.Apple
console.log(Fruit.Banana);
// let color: Color.Red = Fruit.Apple  // 枚举之间不兼容

// 类兼容性
// 属性少的不能给多的
class A {
    constructor(p: number, q: number){}
    id: number = 1
    private c = 1
}
class B {
    static s = 1
    constructor(p: number) {}
    id: number = 2
}
let aa = new A(1, 2)
let bb = new B(1)
// aa = bb
bb = aa

class CC extends A{
    age:number = 12
}
let cc = new CC(1, 3)
cc = aa
aa = cc

// 范型兼容性
interface Empty<T>{
    value: T
}
let obj1: Empty<number> = {value: 2}
let obj2: Empty<string> = {value: 'hi'}
obj1 = obj2


let l1 = <T>(x: T): T =>{
    console.log('x');
    return x
}
let l2 = <U>(y: U): U =>{
    console.log('y');
    return y
}
l1 = l2

export {}