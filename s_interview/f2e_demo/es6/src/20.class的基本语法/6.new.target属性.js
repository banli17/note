const assert = require('assert')

/**
 * new.target 用于构造函数中，函数外部使用会报错，指向那个 new 的类，如果不是new 或Reflect.construct()调用，返回undefined
 * 子类继承父类，new 子类，在父类里 new.target 也是子类。
 * 1. 作用，检测 new 调用
 * 2. 让一个类只能被继承，不能被实例化
 */

class Shape{
    constructor(){
        if(new.target == Shape){
            throw  new Error("Shape 不能被实例化")
        }
    }
}

new Shape();
