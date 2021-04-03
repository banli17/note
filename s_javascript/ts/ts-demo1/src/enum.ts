enum Role{
    Reporter = 1,
    Developer,
    Maintainer,
    Owner,
    Guest
}
// 原理, 反向映射。名称和值都作为了 key
// var Role;
// (function (Role) {
//     Role[Role["Reporter"] = 1] = "Reporter";
//     Role[Role["Developer"] = 2] = "Developer";
//     Role[Role["Maintainer"] = 3] = "Maintainer";
//     Role[Role["Owner"] = 4] = "Owner";
//     Role[Role["Guest"] = 5] = "Guest";
// })(Role || (Role = {}))

console.log(Role.Reporter)

// 字符串枚举， 只有名称作为了 key
enum Message{
    Success = '恭喜你，成功了',
    Fail = '抱歉，失败了'
}

// 异构枚举，混用了，如果赋给了字符串，则只有名称做为key
enum Answer {
    N,
    Y = 'yes'
}

// var Answer;
// (function (Answer) {
//     Answer[Answer["N"] = 0] = "N";
//     Answer["Y"] = "yes";
// })(Answer || (Answer = {}));


// Role.Reporter = 2; 枚举类型的值是只读的
enum Char {
    // 编译阶段就会计算
    a,
    b = Char.a,
    c = 1 + 3,
    // 计算枚举，值会在运行阶段执行
    d = Math.random(),
    e = '123'.length
}
console.log(Char[0]);

// 编译为
// var Char;
// (function (Char) {
//     // 编译阶段就会计算
//     Char[Char["a"] = 0] = "a";
//     Char[Char["b"] = 0] = "b";
//     Char[Char["c"] = 4] = "c";
//     // 计算枚举，值会在运行阶段执行
//     Char[Char["d"] = Math.random()] = "d";
//     Char[Char["e"] = '123'.length] = "e";
// })(Char || (Char = {}));


// 常量枚举，会直接编译为值
const enum Month {
    Jan,
    Feb,
    Mar
}
let month = [Month.Jan, Month.Feb]
// 编译后
// var month = [0 /* Jan */, 1 /* Feb */];

// 枚举类型
enum E {a, b}  // 没有初始值
enum F {a = 0, b = 1}
enum G {a = 'apple', b = 'banana'}

let e: E = 3  // 可以将任何Number类型赋值给枚举类型
let f: F = 3
// let g: E = 'hello'  // 如果字符串会报错
// var e = 3;
// var f = 3

let e1: E.a = 1
let e2: E.b
// 不同的枚举类型不能比较
// e1 === e2 // 此条件将始终返回 "false"，因为类型 "E.a" 和 "E.b" 没有重叠

let e3: E.a = 1

e1 === e3

let g1: G = G.b  // 只能是枚举成员
let g2: G.a = G.a