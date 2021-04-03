const assert = require('assert');

class A {
    a = 100

    constructor() {
        // this.a = 100;
        console.log("A constructor");
        console.log(new.target.name)
    }

    sayAA() {
        console.log("AA------")
        console.log(this)
    }

    static sayStaticAA() {
        console.log("static AA------", this)
    }
}

class B extends A {
    // 1 作为函数使用，父类的构造函数
    // 子类如果不写 constructor，会自动生成构造函数，默认自动调用 super，调用父类的构造函数
    // constructor() {
    //     super();  // A.prototype.constructor.call(this)，必须放在构造函数中，否则报错
    // }

    constructor() {
        super()

        // 这里 valueOf 返回 B 的实例
        console.log(super.valueOf() instanceof B) // true
    }

    // 2. super 作为对象使用，在普通方法中指向父类的原型对象，在静态方法中，指向父类
    sayA() {
        console.log(this.a)
        console.log(super.a)  // super 表示 A.prototype 所以 undefined

        // es6 规定，在子类方法里通过super调用父类方法，this 指向当前实例 B
        // 所以相当于 super.sayAA.call(this)
        super.sayAA();

        super.x = 3;  // 相当于 this.x = 3
        console.log(super.x)  // 相当于读取 A.prototype.x , undefined
    }

    static sayB() {
        // 这里的 this 是子类，而不是实例。相当于 super.sayStaticAA.call(B)
        super.sayStaticAA();
    }

    // 3. 必须显示的指定super 作为函数或对象使用，否则报错，如 console.log(super)
    getA() {
        return super.a
    }
}

new A();
let b = new B();
b.sayA();

console.log(b.constructor)  // Function B

console.log(b.getA())

console.log(b.x)  // 3

B.sayB();
