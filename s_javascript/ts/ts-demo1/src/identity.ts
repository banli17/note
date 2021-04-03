// 泛型
// 可以做到参数和返回值类型一样
function A<T>(value: T): T{
    return value;
}

A(1); // 返回 number 1
let a = A<string>('hi'); // <string> 可以省略，因为 A('hi') 会进行类型推断。
console.log(a); // 'hi'


// 泛型类
class Log<T>{
    run(value: T){
        console.log(value);
        return value;
    }
}

let log1 = new Log<number>()
log1.run(1);
let log2 = new Log()
log2.run(1);
log2.run('hi');

// 泛型约束
interface Length {
    length: number
}
function log<T extends Length>(value: T){
    console.log(value.length);
    return value;
}
log([])
log({length: 3})