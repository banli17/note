const assert = require('assert')

/**
 * 1. 类里面定义的属性，除非显示挂在 this 实例上，否则都是挂在原型上面,如 toString。
 * 2. __proto__ 不是标准，生产环境中可以用 Object.getPrototypeOf() 来获取对象的原型
 * 3. 属性可以使用 getter 和 setter 函数，但是这些函数也是定义在原型上
 * 4. 类的属性或方法名，可以使用表达式，如下 pname
 * 5. class 表达式，类名只在内部可用，可省略
 * 6. 类和模块内部默认就是严格模式
 * 7. class 没有提升，在定义前使用会报错：因为必须保证子类在父类之后定义，提升可能会造成混乱
 */

let pname = "kaka"

class MyClass {
    [pname] = 'xx'

    constructor() {
        console.log(this[pname])  // 'xx'
    }

    get prop() {
        return 'getter'
    }

    set prop(value) {
        console.log("setter: " + value)
    }

    // 类的属性名可以使用表达式
    [1 + 1]() {
        console.log("hello-----", this[pname])
    }
}

let inst = new MyClass()
inst.prop = 123;
console.log(inst.prop)  // 'getter'
console.log(inst.__proto__.prop) // 'getter'

console.log(inst[2]())  // 'hello------ xx'

class CustomHTMLElement {
    constructor(element) {
        this.element = element
    }

    get html() {
        return this.element.innerHTML
    }

    set html(value) {
        this.element.innerHTML = value
    }
}

var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, 'html')

console.log('get' in descriptor)
console.log('set' in descriptor)


/**
 * Class 表达式
 */
const AClass = class A {
    getClassName() {
        return A.name  // A 这个名字只在内部可用，如果没用到，可以省略
    }
}
console.log(new AClass().getClassName())  // 'A'
// console.log(A.name) // ReferenceError: A is not defined

// 没有用到类名 A，可以省略， 下面是一个立即执行类
let person = new class {
    constructor(name) {
        this.name = name
    }
}('李四');
console.log(person.name) // '李四'

/**
 *  注意
 *  1、严格模式
 *  2、不提升
 *  3、name 属性, 函数的名字 Foo.name
 *  4、this 的指向，解决方法： bind 或 箭头函数 或 Proxy
 **/
{
    let Foo = class {
    }

    class Bar extends Foo {
    }  // 如果提升，这里会报错
}
{
    class Foo {
        constructor(...args) {
            this.args = args
        }

        // Generator 方法
        * [Symbol.iterator]() {
            console.log('xx')
            for (let arg of this.args) {
                yield arg;
            }
        }
    }

    // for...of 会执行对象的 [Symbol.iterator] 方法
    // Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。
    for (let x of new Foo('hello', 'world')) {
        console.log(x)
    }
}

// this 指向
{
    class Logger {
        // 箭头函数内部的this总是指向定义时所在的对象。
        // 是构造函数执行时确定，当时 this 就是实例对象
        printName = (name = 'there') => {
            this.print(`hello ${name}`)
        }

        print(text) {
            console.log(text)
        }
    }

    const logger = new Logger();
    const {printName} = logger
    // 注意 this 指向错误
    printName(); // Cannot read property 'print' of undefined
}

{
    // 通过 Proxy  自动绑定 this
    function selfish(target) {
        const cache = new WeakMap();
        const handler = {
            get(target, key) {
                const value = Reflect.get(target, key);
                if (typeof value !== 'function') {
                    return value;
                }
                if (!cache.has(value)) {
                    cache.set(value, value.bind(target));
                }
                return cache.get(value);
            }
        };
        const proxy = new Proxy(target, handler);
        return proxy;
    }

    const logger = selfish(new Logger());
}
