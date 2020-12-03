// 类的实现
class Dog {
    constructor(name: string){
        // 实例属性必须赋初始值
        this.name = name
    }
    name: string
    run(){
        Dog.maxAge
    }
    private pri(){}
    protected pro(){}
    readonly sex: number = 12;
    static maxAge:number = 12
    sleep(){
        console.log('这是一个狗在睡觉')
    }
    eat(){}
}

let dog = new Dog('hello')
Dog.maxAge;
// dog.maxAge
// dog.pri()
// dog.pro()

// 类的继承
class Husky extends Dog{
    constructor(name: string, public color: string){
        super(name)
        this.color = color
        this.pro()
        // this.maxAge 
        Husky.maxAge
    }

    // color: string
}
// let husky = new Husky('h', 's')
// husky.pro()

// 默认都是 public 的
// 私有成员只能类本身调用。实例、子类都不能调用
// 私有构造函数，不能被继承和实例化
// protected 只能在类本身或子类中调用，不能被实例调用
// readonly 只读属性，一定要被初始化
// 构造函数参数可以添加修饰符，会自动变成实例属性，就不需要额外声明属性了
// static 静态成员 ，只能通过类名或子类(可以被继承)调用，不能通过实例调

// 抽象类：只能被继承、不能被实例化的类
abstract class Animal {
    eat(){}
    // 可以实现多态，一个类的同一个方法可以有不同的实现(子类)
    abstract sleep(): void // 抽象方法，没有具体的方法实现，在子类中实现
}
// let animal1 = new Animal() // 无法实例化
class Cat extends Animal{
    sleep(){
        console.log('这是一个猫在睡觉')
    }
}
let cat = new Cat()
cat.eat()
cat.sleep()

// 多态
let animals1: Animal[] = [dog, cat]
animals1.forEach(a=>{
    a.sleep()
})

// 方法的链式调用
// this 可以表现多态，可以是父类也可以是子类
class WorkFlow{
    step1(){
        return this
    }
    step2(){
        return this
    }
}
new WorkFlow().step1().step2()

class MyFlow extends WorkFlow{
    next(){
        return this
    }
}
// 这里注意 this 相当于给 MyFlow 添加了 step1 方法， this 是 new MyFlow()
new MyFlow().next().step1().next().step2()


// 类与接口
// 约束类有哪些属性
interface Human {
    // new (name: string): any
    name: string;
    eat(): void
}
// 必须实现接口中所有的属性
// 接口只能约束类的公有成员
// 接口不能约束类的构造函数，类型“Asian”提供的内容与签名“new (name: string): any”不匹配。
class Asian implements Human{
    name: string
    constructor(name: string){
        this.name = name
    }
    eat(){}
}
// 接口可以被继承，可以继承多个接口
interface Man extends Human {
    run(): void
}
interface Child {
    cry(): void
}
interface Boy extends Man, Child{

}
let boy: Boy = {
    name: '',
    run(){},
    eat(){},
    cry(){}
}

// 接口继承类: 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
// 一个接口继承了一个拥有私有或受保护的成员类时，这个接口类型只能被这个类或其子类所实现
class Auto{
    state = 1
    private state2 = 0
}
interface AutoInterface extends Auto{
    
}
// 无法实现 Auto 里的 private state2，所以只能 extend Auto或其子类
class C implements AutoInterface{
    state = 2
}
class Bus extends Auto implements AutoInterface{

}