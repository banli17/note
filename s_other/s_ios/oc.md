---
title: Objective-C 程序设计
---

## Objective-C 编程

![](imgs/2020-05-21-12-49-17.png)

通过命令行运行 oc 文件。

```
# 使用 clang 的 llvm clang objective-c 编译器编译并链接这个程序
clang -fobjc-arc files -o program

# 编译 main.m 并且将它叫做 prog1 命令
clang -fobjc-arc main.m -o proj1

# 执行 prog1 命令，可以用相对路径 或者将它添加在 shell PATH 变量中
./prog1
```

**注释**

会被编译器忽略

-   单行注释 `//`
-   多行注释 `/* */`

`@autoreleasepool{}`之间的语句会被放到`自动释放池`语境中执行。自动释放池的机制：创建新对象时，系统能够有效管理应用所使用的内存。

-   `@"hello world"`，叫做常量 NSString 对象。
-   `"hello world"` 所常量 C 类型的字符串。

显示变量的值

```
// 格式字符串
NSLog(@"i = %i", sum);
```

## 类与对象

对类和实例调用方法：

```
// 发送消息
[ClassOrInstance method];

// 另一种表现：接收消息
[receiver message];
```

```c
// 创建对象
yourCar = [Car new];

// 传递参数
[youCar setSpeed: 55]
```

**处理分数**

程序从逻辑上分为 3 部分：

-   @interface 部分： 用于描述类和类的方法
-   @implementation 部分: 用于实现数据(类对象的实例变量存储的数据)和方法
-   program 部分: 实现程序

**@interface**

```
@interface NewClassName: ParentClassName
    propertyAndMethodDeclarations;
@end

// 例如
@interface Fraction: NSObject

-(void) print;
-(void) setNumerator: (int) n;
-(void) setDenominator: (int) d;

@end
```

类方法和实例方法

```
-(void) print;
```

开头的负号`-`表示这是一个实例方法，另外，+ 表示类方法。

返回值：需要将返回类型放入开头的正负号之后圆括号。

void 表示没有返回值，可以不写 return ，或者只写 `return;`

```
// 方法类型(返回类型) 方法名: (参数类型) 参数名;
// : 表示方法有参数
-(void) setNumerator: (int) n;
-(void) print;  // 无参数
```

### 3.5 @implementation 部分

@implementation 用于实现 @interface 部分的方法。

```
@implemenation NewClassName
{
    memberDeclarations;
}
    methodDefinitions;
@end
```

也可以在后面使用 `:`继承，但它是可选的，通常不这样做。

```
@implementation Fraction: NSObject
```

memberDeclarations 部分指定了要存储的数据。
methodDefinitions 部分指定了 @interface 里的方法。每

### 3.6 program 部分

**main.m**

```c
int main(int argc, const char * argv[]) {
    @autoreleasepool {

        // * 表示 f1 是 Fraction 对象的引用(或指针)，存储的是内存地址
        Fraction *f1;

        // 下面等价于 f1 = [[Fraction alloc] init];
        f1 = [Fraction alloc];  // 为对象分配内存
        f1 = [f1 init];  // 初始化对象

        [f1 setNumerator: 1];
        [f1 setDenominator: 3];

        // 打印显示分数
        NSLog(@"分数为: ");
        [f1 print];
    }
    return 0;
}
```

### 3.7 实例变量的访问及数据封装

实例变量对外是隐藏的。可以通过自己写访问器属性来访问和设置。
访问器属性： 设值方法(setter)，和取值方法(getter)。

## 4. 数据类型和表达式

### 4.1 数据类型和常量

-   int `(%i)`: 整数，存储和计算机有关，语言没有规定这个量。
-   float `(%f/%g)`：小数，或者也可以用科学技术法表示。
-   double `(%g)`: 和 float 相似，存储范围约为 float 的两倍。
-   char `(%c)`单个字符: 将字符放在单引号里得到字符常量，如`'a'`，`\n`也是合法的字符常量，oc 编译器将它看作单个字符。

oc 中，数字、单个字符、字符串通常都称为常量，比如 58 是一个常量整数值，`@"hello"` 是一个常量字符串对象，`@5`表示一个常量数字对象。

**限定词**

-   long: 比如 `long int`，NSLog 用 `%li` 显示。
-   long long
-   short
-   unsigned 无符号，能表示的数据更大
-   signed 有符号

**id 类型**

id 数据类型可存储任何类型的对象。

```
id graphicObject
-(id) newObject: (int) type
```

![](imgs/2020-05-22-15-08-29.png)

### 4.2 算术表达式

```
int a= 1;
int b = 2;
NSLog(@"a/b = %i", a/b); // 0 ，会将小数点省略

float a1 = 1;
float b1 = 2;
NSLog(@"a1/b1 = %f", a1/b1);  // 0.500000
```

优先级: `一元负号运算符` > (`算术运算符(+ - * / %)` | `一元正号运算符`)。

```
-a * b
```

模运算符 % 只用于处理整数。

**整数和浮点数转换**

隐式转换

```
float f1 = 123.125, f2;
int i1, i2 = -150;
i1 = f1;
NSLog(@"浮点数 %f 变成了整数 %i", f1, i1);  // 浮点数 123.125000 变成了整数 123

f1 = i2;
NSLog(@"整数 %i 变成了浮点数 %f", i2, f1); // 整数 -150 变成了浮点数 -150.000000

f1 = f1/150;
NSLog(@"f1 %f", f1);  // f1 -1.000000

f2 = (float) i2 / 100;
NSLog(@"f2 强制转换 %f", f2);  // f2 强制转换 -1.500000
```

整数变量指派给浮点变量不会引起数值的改变。浮点数转为整数时，小数部分会被删除。

**类型转换运算符**

```
f2 = (float) i2 /100; // 强制转换
(int) 12.2
```

类型转换运算符可以将 id 类型的对象转为特定类的对象。

```
id num;
Fraction *f1;
f1 = (Fraction *) num;
```

### 4.3 赋值运算符

格式为：

```
op=
// op 可以为 + - * / %
```

### 4.4 Calculator 类

**Calculator.h**

```
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Calculator : NSObject
-(void) setN: (double) x;
-(double) getN;
-(void) add: (double) x;
-(void) minus: (double) x;
@end

NS_ASSUME_NONNULL_END
```

**Calculator.m**

```
#import "Calculator.h"

@implementation Calculator
{
    double n;
}
-(double) getN
{
    return n;
}
-(void) setN: (double) x
{
    n = x;
}
-(void) add:(double)x
{
    n += x;
}
-(void) minus:(double)x
{
    n -= x;
}
@end
```

**main.m**

```
Calculator *ca = [[Calculator alloc] init];
[ca setN:10];
[ca add:20];
[ca minus:5];
NSLog(@"最后的值 %i", (int)[ca getN]);
```

## 5. 循环结构

### 5.1 for 循环

```
void testFor(){
    int sum = 0;
    for(int n = 1;n<=200;n++){
        sum += n;
        NSLog(@"%3i %i",n, sum);
    }
    NSLog(@"sum 的值是 %d", sum);
}
```

上面的 `%3i` 表示在特定点显示整数值，即在第三位对其，还可以用负数表示左对齐，如下所示。

```
// %3i
  1
 10
100

// %2i
 1
10
100

// %i
1
10
100
```

![](imgs/2020-05-22-16-05-31.png)

关系运算符的优先级比所有算术运算符都低。如 a < b + c 会按照 a < (b+c) 求值。

-   `scanf()`: 用于键盘输入

```
int number;
// NSLog 第一个参数是 NSString，需要@
NSLog(@"请输入数字：");
// scanf 第一个参数是C风格的字符串，不加@
// & 表示指针
scanf("%i", &number);
```

### 5.2 while 语句

**求两个非负整数的最大公约数**

```c
void testMaxGCD(){
    int u, v, temp;
    scanf("%i %i", &u, &v);

    while (v != 0) {
        temp = u % v;
        u = v;
        v  = temp;
    }

    NSLog(@"最大公约数为 %u", u);
}
```

**反转打印整数的数字**

```c
void reversePrintNum(){
    int n, right_digit;
    NSLog(@"请输入数字:");
    scanf("%i", &n);
    while (n !=0) {
        right_digit = n % 10;
        NSLog(@"%i", right_digit);
        n /= 10;
    }
}
```

### 5.3 do 语句

do 语句的语法为：

```
do
    program statement
while (expression)
```

上面的`reversePrintNum()`如果输入 0 不会打印任何数字。可以转换为 do while 语句。

### 5.4 break 语句

break 语句用于跳出循环。

```
break;
```

### 5.5 continue 语句

continue 语句用于跳过本次循环，继续执行下一次循环。

```
continue;
```

## 6. 选择结构

### 6.1 if 语句

```
if (expression)
    program statement 1
else
    program statement 2
```

```
-(double) covertToNum
{
    if (d !=0){
        return (double) n / d;
    }else{
        return NAN; // NAN 在系统头文件 math.h 中，会自动引入
    }
}
```

**复合条件测试**

-   逻辑与(&&) 和逻辑或(||)。
-   && 比 || 优先级高，比运算符和关系符低。

```
// 判断闰年
// 判断是否是闰年
Boolean isRunYear(int year){
    int rem_4 = year % 4;
    int rem_100 = year % 100;
    int rem_400 = year % 400;
    if((rem_4 == 0 && rem_100!=0) || rem_400 == 0){
        NSLog(@"%i 是闰年", year);
        return true;
    }else{
        NSLog(@"%i 不是闰年", year);
        return false;
    }
}
```

**嵌套 if 语句**

注意：else 子句通常和最近的不包含 else 子句的 if 语句对应。

```
if expression1
    if expression2
        program statement 1
else
        program statement 2

// 会被变成
if expression1
    if expression2
        program statement 1
    else
        program statement 2
```

所以条件语句都用 {} 包起来。

**else if 语句**

```
if (expression1)
    program statement 1
else if (expression2)
    program statement 2
else
    program statement 3
```

### 6.2 switch 语句

```
switch (expression)
{
    case value1:
        program statement
        break;
    case value2:
        program statement
        break;
    default:
        program statement
        break;
}
```

### 6.3 Boolean 变量

用于标记值状态的变量叫 Boolean 变量，比如下面的 isPrime 变量。

```
// 打印素数
void printPrime(){
    int p, d, isPrime;

    for(p = 2;p<=50;p++){
        isPrime = 1;
        for(d = 2;d < p;d++){
            if(p%d == 0) isPrime = 0;
        }
        if(isPrime != 0){
            NSLog(@"%i ", p);
        }
    }
}
```

oc 内置的布尔型(用 BOOL 表示)：

-   true 或 YES
-   false 或 NO

```
BOOL a = YES;
NSLog(@"a = %i", a);  // a = 1
```

### 6.4 条件运算符

条件运算符的一般格式为：

```
condition ? expression1 : expression2
```

条件运算符是从右到左结合的，所以：

```
e1 ? e2 : e3 ? e4 : e5
// 等价于
e1 ? e2 : (e3 ? e4 : e5)
```

Xcode 支持如下条件运算符的非 ANSI 扩展语句：

```
condition ? : expression
// 等价于
condition ? condition : expression
```

## 7. 类

### 7.1 分离接口和实现文件

新建 Cocoa class 创建类。会生成 .h 和 .m 文件。类的声明(@interface 部分) 放在 class.h 文件中，而类的定义(@implementation 部分)放在 class.m 文件中。这样接口和实现文件就分离了。

```
// 导入系统文件
#import "<Foundation/Foundation>"

// 导入本地文件
# import "Hello.h"
```

### 7.2 合成存取方法

oc 为了方便，在 2.0 开始，可以自动生成存取方法(setter, getter)。

1. 在接口部分使用 @property 声明属性，这些属性的命令与实例变量相同，尽管不是必须的。

```
@interface A: NSObject

@property int a, b;

-(void) print;
@end
```

2. 在实现部分使用 @synthesize 指令。

```c
#import "A.h"

@implementation A

// 会自动生成取值方法 x 和设值方法 setX
// 不使用 @synthesize，只使用 @property，生成的实例变量是 _x，以 _ 开头
// 使用 @synthesize，生成的实例变量是 _
@synthesize a, b;

-(void) print
{

}
@end
```

### 7.3 使用点运算符访问属性

取值可以使用下面 2 种语句：

```
[instance property]
instance.property
```

赋值也有 2 种语句：

```
[instance setProperty: value]
instance.property =  value
```

### 7.4 具有多个参数的方法

类似命名参数一样，不过有点绕。

```
-(void) eat: (int) food drink: (int) joice
{
    NSLog(@"吃的食物是 %i, 喝的饮料是 %i", food, joice);
}

// 使用
[instance eat: 12 drink: 13];
```

**不带参数名的方法**

方法参数名是可选的。但是如果不写参数名感觉不直观。

```
-(void) eat: (int) food : (int) joice

// 使用
[[instance eat: 12 : 13]]
```

**引用类型参数**

```
-(void) eat: (Animal *) animal;
```

### 7.5 局部变量

函数内的声明的变量就是局部变量，基本值类型没有初始值，基本对象类型默认初始值为 nil。

**方法的参数**

方法的参数名也是局部变量，执行方法时，参数会被复制为局部变量。如果参数是对象，则传递的是对象的引用。

**static 关键字**

在变量声明前加上关键字 static，可以使局部变量保留多次调用一个方法所得的值。static 整数变量会被初始化为 0，并且只初始一次，并且在多次调用时保存这个值。

```
int testStatic(){
    static int c;
    NSLog(@"c is %i", c);
    c ++;
    return c;
}
testStatic();
testStatic();
int b = testStatic();  // 3
```

这有点类似利用闭包来保存的变量。

因为变量的作用域，它只能在 testStatic 函数内访问，可以将 static 变量移动到文件顶部，这样所有的方法都可以访问它。

### 7.6 self 关键字

通过 self 指明调用者为该对象。类似于 js this。

```
[self method]
```

例子：

```
-(void) eat
{}
-(void) haveLaunch
{
    [self eat];  // 调用当前实例的 eat 方法
}
```

### 7.7 在方法中分配和返回对象

这个就类似于 js 里的返回 this 对象，进行链式调用。例子如下：

```
-(Fraction *) add: (Fraction *) f
{
    Fraction * result = [[Fraction alloc] init];
    // do something....
    return result;
}

// 使用
Fraction *a = [[Fraction alloc] init];
Fraction *b = [a add: a];
[[b add: a]];  // b 还可以继续调用 add
```

### 7.8 其它疑问

1. 静态变量

oc 中的静态变量和 java 不同，不能直接通过类名来访问，只能在所声明的 `.m` 文件中访问。而且 static 变量必须放在 @implementation 外面。

2. 静态常量

```
static const a = 0.5;
```

定义字符串常量要注意:

```
// 可修改，是指针不变，内容可变
static NSString const * a = @"a";
static const NSString * a = @"a";

// 不可修改
static NSString * const a = @"a";
```

3. 全局变量: extern 修饰的变量是全局变量。

```
// .h 中定义
extern NSString * const a

// .m 中实现
NSString *const a =  @"hello";
```

4. 静态方法可以通过类直接访问。

```
// Property access result unused - getters should not be used for side effects
Fraction.sayHello;  //警告，因为 . 是用于属性，而不用于方法

// OK
[Fraction sayHello];
```

5. 私有属性、私有方法

-   私有属性：在 .h 中声明的属性是公开的，在 .m 中实现的变量默认是私有 (@private) 的，不能改为 @public，注意不能和 .h 的成员变量同名。
-   私有方法：只有实现，没有声明的方法。oc 中没有真正的私有方法，在外面也可以调用。

```
// .h中
@interface Person: NSObject
{
    // 默认是 @private ，即使 @public 也无效
    @private
    NSString name;   // 私有变量，也可以将 @private 去掉
}

// .m 中
@property
```

## 8. 继承

### 8.1 一切从根开始

在 oc 中，可以自定义 root 类，但是通常不这样做。一般是继承自 NSObject 类。

```
@interface A: NSObject
...
@end
```

子类可以调用父类的非私有实例变量和方法。

使用 @property 声明的属性是私有的，要定义公共的属性，需要在接口部分明确声明。

### 8.2 通过继承来扩展：添加新方法

### 8.3 覆写方法

## 9. 多态、动态类型和动态绑定

## 10. 变量和数据类型

一些概念：变量，实例变量、静态变量、全局变量，局部变量，作用域，实例方法，静态方法，调用方式，私有属性，私有方法等，继承，self。

### 10.1 对象的初始化

成员变量：`@implemetation {}` 里定义的。内部使用，除非使用 @public，通过`p->name`可以访问，但是不推荐。
如果没有属性，要访问成员变量，还需要自己定义 getter setter 方法。
属性：供外部使用 @property

```
// 旧版本的 xcode 如果要链接属性和成员变量，需要像下面这样做
// 如果直接属性用 _age，会导致 .m 内部不知道是调用的属性还是成员变量
{
    int _age;
}
@property age;

@synthesize age = _age;

// 新版本会自动给属性添加一个 _同名的成员变量
@property age;
@synthesize age;
// 内部可以使用 _age
```

因为成员变量是内部使用的，所以没有必要在 .h 里定义，直接在 .m 文件中定义即可。

静态变量 static
静态方法不能调用成员变量。

方法名: 去掉 - 和参数类型

```
// show:
-(int) show: (int)a
// show: andB:
-(int) show: (int)a andB: (int) b
```

特殊: 匿名函数

```
-(int): (int)a : (int)b

p:10:20
```

初始化方法

```
-(id) init; // 返回任何类型都可以，可能导致错误
// 或
-(instancetype) init; // 推荐，返回当前实例类型

-(instancetype) init
{
    self = [super init];
    if (self){
        // 初始化成员变量
        _name = @"zs";
        _age = 20;
    }
    return self;
}
```

只声明了 `@property` 的属性，会在内部生成 `_同名` 的成员变量。而使用 `@synthesize` 后，会生成同名的成员变量。

访问修饰符
成员变量有：@protected(默认)、@public、@private、@package，`@public`需要通过 `p->name`形式来方法
属性：相当于是 getter setter 方法，方法是没有访问修饰符的，如果要私有，则不写在 .h 中，直接在 .m 里写，

private 变量是无法继承的。但是如果继承了方法，方法里使用了 private 变量，是可以工作的。
oc 没有多继承，可以使用协议来实现，java 是通过接口来实现。
父类不写方法实现，是无法被继承的。

oc 没有重载，只有重写。

可以用父类来接受子类对象。

```
Printer *printer = [[BlackPrinter alloc] init];
[printer print]
```

## 11. 分类和协议

## 12. 预处理程序

## 13. 基本的 C 语言特性

## 14. Foundation 框架简介

## 15. 数字、字符串和集合

## 16. 使用文件

## 17. 内存管理和自动引用计数

## 18. 复制对象

## 19. 归档

## 20. Cocoa 和 Cocoa Touch 简介

## 21 编写 IOS 应用程序

### 类的定义

**类的定义 A.h**

```
@interface SimpleClass: NSObject

// 属性，指针类型
@property NSString *firstName
@property NSString *lastName
@property Number age
@property int yearOfBirth
@property (readonly) NSString *sex  // 只读属性

// 方法
// - 方法，实例方法
// + 方法，静态方法

@end
```

**类的实现 A.m**

```
#import "A.h"

@implementation A
- (void) sayHello{
    NSLog(@"Hello, World!")
}
@end
```

### 类型系统

基本数据类型

-   int 32 位
-   float 32 位
-   double 64 位
-   char 一个字节，8 位，一个字符
-   NSString 字符串 @"hello"，常用
-   字符串 "hello"
-   指针类型 \*p
-   自定义类型
-   万能类型 id

**引用类型**

-   class
-   pointer 指针
-   block 块

**类型装饰**

-   protocol 协议
-   category 类别
-   extension 扩展

**值类型**

-   基础数值类型
-   结构 stuct
-   枚举 enum

### class 和 stuct

运算符

--
三目运算符

条件语句
if else
goto

```c
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        for (int a = 1; a<10; a++) {
            NSLog(@"a = %d", a);
        }

        int i = 0;
    a:{
        i++;
        NSLog(@"i = %d", i);

    }
    b: {
        i = 1;
    }

        if (i<10){
            goto a;
        }else if(i>11){
            goto b;
        }else{

        }

    }
    return 0;
}
```

```
while(i<4){
    if(i == 2) {
        continue;
        NSLog(@"hello");
    }
    if(i==3) break;
}

do{

}while(i<4)


switch (a) {
    case 1:
        NSLog(@"中奖了");
        break;

    default:
        break;
}
```

函数

函数声明不会提前，所以调用时需要在上面定义。

```
void say(char str){
    NSLog(@"%c", str);
}
void main(){
    sayHello('e'); // 单引号
}
```

面向对象

```
// 实例化对象
// - alloc 为对象分配内存空间
// - init 进行初始化操作
People *p1 = [[People alloc] init];
```
