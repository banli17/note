var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 类的实现
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.sex = 12;
        // 实例属性必须赋初始值
        this.name = name;
    }
    Dog.prototype.run = function () {
        Dog.maxAge;
    };
    Dog.prototype.pri = function () { };
    Dog.prototype.pro = function () { };
    Dog.prototype.sleep = function () {
        console.log('这是一个狗在睡觉');
    };
    Dog.prototype.eat = function () { };
    Dog.maxAge = 12;
    return Dog;
}());
var dog = new Dog('hello');
Dog.maxAge;
// dog.maxAge
// dog.pri()
// dog.pro()
// 类的继承
var Husky = /** @class */ (function (_super) {
    __extends(Husky, _super);
    function Husky(name, color) {
        var _this = _super.call(this, name) || this;
        _this.color = color;
        _this.color = color;
        _this.pro();
        // this.maxAge 
        Husky.maxAge;
        return _this;
    }
    return Husky;
}(Dog));
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
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.eat = function () { };
    return Animal;
}());
// let animal1 = new Animal() // 无法实例化
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.sleep = function () {
        console.log('这是一个猫在睡觉');
    };
    return Cat;
}(Animal));
var cat = new Cat();
cat.eat();
cat.sleep();
// 多态
var animals1 = [dog, cat];
animals1.forEach(function (a) {
    a.sleep();
});
// 方法的链式调用
// this 可以表现多态，可以是父类也可以是子类
var WorkFlow = /** @class */ (function () {
    function WorkFlow() {
    }
    WorkFlow.prototype.step1 = function () {
        return this;
    };
    WorkFlow.prototype.step2 = function () {
        return this;
    };
    return WorkFlow;
}());
new WorkFlow().step1().step2();
var MyFlow = /** @class */ (function (_super) {
    __extends(MyFlow, _super);
    function MyFlow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyFlow.prototype.next = function () {
        return this;
    };
    return MyFlow;
}(WorkFlow));
new MyFlow().next().step1().next().step2();
console.log(new MyFlow().next().step1());