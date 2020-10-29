{
    console.log('------------test Enum------------')

    /**
     * 枚举
     * 1. 默认值从 0 开始
     * 2. 可以通过数字值来获取该值的名称，如 Color[3] 获取的是名称 'Yellow'
     */
    enum Color {
        Red,
        Blue,
        Yellow = 3
    }

    let c: Color = Color.Blue
    console.log(c)

    let colorName = Color[3];
    console.log(colorName)  // true
    console.log(Color[2])  // undefined
}

{
    console.log('------------test Any------------')

    /**
     * any
     * 1. 不知道数据的类型，可以退出检查
     * 2. 变量可以调用任何方法，但是 Object 不行，只能分配值
     * 3. 数组混合多种类型的值
     */
    let c: any = 4;
    console.log(c.toFixed(2)); // 4.00
    c = 'hi';

    let d = 4;
    d = 'hi';  // 报错，有类型推断

    // Object 允许分配任何值，但是不能调用任意方法
    let e: Object = 5;
    console.log(e.toFixed(2));  // 5.00

    // 分配任意类型值的数组
    let list: any[] = [1, true, 'free']
    list[1] = 100
}

{
    console.log('------------test void------------')

    /**
     * void
     * 1. 函数没有返回值
     * 2. 变量为 undefined
     */
    function t(): void {
    }

    function q(): void {
        return 1
    }

    let c: void = undefined;
    c = null;   // 如果没有设置 --strictNullChecks，则不会报错
}

{
    console.log('------------ test Null and Undefined ------------')

    /**
     * Null 和 Undefined
     * 1. 它们都有自己的默认值 null 和 undefined
     * 2. 它们都是其它类型的子类型，所有可以将它们赋值给其它类型，但是不能设置 strictNullChecks，如果设置，它们只能分配给自己或any类型。可以用 number|null
     */
    let u: undefined = undefined;
    let n: null = null;
    n = 3;

    let x: number = 2;
    x = null;

    let y: number | null = 2;
    y = null;
}

{
    console.log('------------ test Never ------------')

    /**
     * never:
     * 1. 表示值不会发生的类型，如始终抛出错误或死循环
     * 2. never 是任何类型的子类， never 只有自身，即使 any 也不属于它
     *
     */
    function error(): never {
        throw new Error("hello")
    }

    function fail(): never {
        return error();  // 返回 error 类型
    }

    function infiniteLoop(): never {
        while (true) {
        }
    }
}

{
    console.log('------------ test Object ------------')
    /**
     * Object
     * 1. 表示非原始值，即非 number/string/boolean/undefined/null/symbol
     */
    Object.create({})

}

// 可以给函数设置 参数类型 和返回值，在编译时会被删除掉，比如 jQuery(selector: string | object)
// declare function create(o: object | null): void;
//
// console.log(create({}))
// console.log(create(1));

{
    console.log('------------ test 类型断言 Type assertions ------------')
    /**
     * 类型断言
     * 1. 类似于类型转换，不执行数据的特殊检查。用于自己很确信类型无误
     * 2. 两种形式： 尖括号    和   as 语法 等效， 但是 jsx 只能用 as
     */

    let someValue: any = "this is a string"
    let strLength: number = (<string>someValue).length

    let s: any = "this is a string"

    let sLen: number = (s as string).length
    console.log('sLen: ', sLen)
}
