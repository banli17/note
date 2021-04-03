// 类 es6  类来调用的静态属性  私有的实例属性   共享的原型属性

// as 断言成xxx
// ! 非空断言
// ?  链判断运算符 有值取值 没值返回undefined

class Pointer {
    public x!:number // 表示实例上有这个属性
    public y!:number
    constructor(x:number,y?:number,...args:number[]){ // 这些参数 函数中的使用方式 这里都可以使用
        this.x = x;
        this.y = y as number
    }
    static a = 1;
}
let pointer = new Pointer(1,2,3,4,5,6);


// （public private protected） readonly 类的修饰符 
// public 表示 父类本身 子类 外面 都可以获取这个属性
// protected 受保护的  父类本身 子类 能访问到这个属性
// private 只有自己能访问到

// 如果constructor 被标识成了 private 或者 proteced 则此类不能被 new，被标识成了private 不能被子类继承
class Animal{
    private name!:string;
    public readonly age!:number; // readonly 表示此属性不能被修改
    protected constructor(name:string,age:number){
        this.name = name;
        this.age = age
    }
    //  静态属性 和 静态方法 通过类来调用的就是静态的 (是可以被继承的)
    static type ='动物';
    static getName(){
        return '动物类'
    }
    say(){
        console.log('say')
    }
}

class Cat extends Animal{
    readonly address:any = {a:1};
    constructor(name:string,age:number,address:any){
        super(name,age); // Animcal.call  // 父类本身
        // this.address = address;
        // readonly 表示初始化后不能在被修改了
    }
    static getName(){ // 子类重写父类的方法
        console.log(super.getName()); // 静态方法中的super指代的是父类 
        return '猫'
    }
    say(){ // 原型中的super指代的是 父类的原型
        super.say(); // Aniaml.prototype
        console.log('cat say');
    }
    // 属性访问器 , 来访问私有属性
    private _eat:string='';// vue defineProperty
    get eat(){ // 原型属性
        return this._eat; // 谁调用此方法this就是谁
    }
    set eat(newVal){
        console.log(newVal,'-----')
        this._eat = newVal;
    }
}
// 爸爸 -》 儿子 =》 孙子 
let tom1 = new Cat('Tom1',10,'美国'); 
let tom2 = new Cat('Tom2',10,'美国'); 
console.log(Cat.getName())

tom2.eat = 'hello';
console.log(tom2.eat);
// 原型 实例 静态 super 属性访问器



// 装饰器  接口 泛型


// private public protectected readonly

export {}