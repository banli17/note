const assert = require('assert')

/**
 * 1. 静态方法里的 this 指的是类本身
 * 2. 静态属性和方法会被子类继承
 */
class Foo {
    static bar() {
        this.baz();
    }

    static baz() {
        console.log('static baz')
    }

    baz() {
        console.log('instance baz')
    }
}

Foo.bar();  // static baz

class Bar extends Foo {
    static xBar() {
        super.baz();
    }
}

Bar.baz(); //  console.log('static baz')
Bar.xBar();
