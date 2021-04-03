
// 1） 联合类型   (不能断言成一个不存在的属性 ,尽量避免使用双重断言)
// 默认你可以认为是并集 

let str: string | number; // 当没有初始化的时候 只能调用两者类型中的共同方法

// str.toString
// str.valueOf
str = 1; // 会根据赋值 来推到后续的方法
str.toFixed();

str = 'abc';
str.toLowerCase();


let ele: HTMLElement | null = document.getElementById('#app');
// ele!.style.color = 'red'; // 非空断言 表示一定有值 ts语法
ele?.style?.color;  // ele && ele.style && ele.style.color 链式可选运算符


// 可以做断言操作 也能解决这个问题
(<HTMLElement>ele).style.color = 'red'; // 这个和 jsx 语法有冲突 尽量不采用
(ele as HTMLElement).style.color = 'red'; // 断言 不能断言不存在的属性

// 双重断言 (不建议使用 会破坏原有类型)
(ele as any) as boolean

// 字面量类型

type Direction = 'up'|'down'|'left'|'right'; // 类型别名
let direction:Direction
direction = 'up';
export { }