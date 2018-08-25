# java简介

## 简介

**编译型语言**

java 是编译型语言，文件后缀是`.java`，先由 javac 命令编译成字节码文件`.class`，再运行 java 命令执行。相对解释型语言来说编写、编译比较麻烦，但是执行速度快。

**跨平台性**

java能跨平台，是依赖于 JVM 虚拟机。

**jre和jdk**

`jre` 全称是 java runtime evironment。它包含 JVM 和 java 核心库，是 java 的运行环境。

`jdk` 全称是 java development kit。它包含 jre，还包含一些命令程序如 javac、java等。是开发 java 所必须的。

**配置环境变量Path**

安装完 jdk 后，java等命令只能在安装目录的 bin 下运行，要想让它在全局运行，需要配置全局变量。

1. 新增 `JAVA_HOME`指向 jdk 目录，而不是 bin 目录。
2. 在 Path 下新增 `%JAVA_HOME\bin;`

## 编写HelloWorld

```java
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("HelloWorld");
    }
}
```

- class 是java的最小组成单位。
- main 是入口方法，每个 class 必须要有一个 main 方法，否则再运行时会报错。

## 数据类型

计算机表示信息含义的最小单位是 bit，存储的最小单位是 byte，`1 byte = 8 bit`。

java 数据类型分为：

```
- 基本类型
    - 数值型
        - 整数型
            - byte   1byte  (-127~128)
            - short  2
            - int    4
            - long   8
        - 浮点型
            - float  4
            - double 8
    - 字符型char      2
    - 布尔型boolean   1

- 引用类型
    - class
    - 数组
    - 接口
````

## 标志符

标志符可以由下面三种数据组成：
- unicode: 包含数字、英文、汉字
- 下划线 _
- 美元符 $

但是标志符不能以数字开头。

下面是一些规则：
- class：各单词首字母都大写
- 属性和方法：驼峰命名法

## 变量

变量的定义：`类型 变量名 = 变量值`。

默认定义的数字是 int 类型，默认浮点型是 double 类型。

```java
int a = 1;
long a = 100000000000000L; // 要加L，因为默认是int
float b = 12.34F;  // 要加F，否则报精度损失
```

## 类型转换

类型转换分为：隐式类型转换、显示类型转换。

类型转换的方向是从小到大，`byte -> short -> int -> long -> float -> double`。

```java
// 隐式
int a = 1;
short b = 2
//short c = a + b;  报错，损失精度
int c = a + b;    // 正确
System.out.println(a + b);

// 显示
int c = (int)(a + b)
```

## 运算符

运算符就是用于对常量和变量进行操作的符号。表达式是用运算符连接起来的java语句的式子。

- 算数运算符
- 赋值运算符
- 关系运算符
- 逻辑运算符
- 三元运算符

### 算数运算符

`+,-,*,/,%,++,--`。

```java
3/4    -> 0  向下取整
3.0/4  -> 0.75
```

整数相除只能得到整数，要想得到小数，必须有浮点数参与运算。

字符参与运算实际是用其在计算机中存的值来运算的。字符串加法是做字符串拼接。

```
// 字符加法
// 'A' -> 65, 'a' -> 97 , '0' -> 48
int a = 10;
int b = 20;

System.out.println('a' + b);  // 75

// 字符串加法，顺序和js一样
System.out.println("a" + 3 + 4);  // "a34"
System.out.println(3 + 4 + "a");  // "7a"
```

- `++`：用于对变量进行+1。不过最好单独使用，这样比较清晰。
- `--`：用于对变量进行-1。

```
// 例1
int a = ++10;  // 11
int b = 10++;  // 10

// 例2
int a = 3;
int b = 4;
System.out.println(++a);  // 4
System.out.println(b++);  // 4
```

### 赋值运算符

赋值运算符包括：`=, +=, -=, *=, /=`。`+=`等扩展赋值运算符实际包含强制转换。

```java
int a = 10;
short b = 20;
a += b;  // 实际相当于 a = (int)(a + b);会转成a类型
System.out.println(a);
```

### 关系运算符

关系运算符包括：`==, !=, >, >=, <, <=`，没有全等。关系运算符的结果是 boolean 类型。

```java
int a = 10;
int b = 11;
System.out.println(a>b);  // false
```

### 逻辑运算符

逻辑运算符用于连接关系表达式。`& | ^ ! && ||`。

- & 与，有false则false，左右都会执行。
- | 或，有true则true
- ^ 异或，相同为false，不同则true
- ! 非，取反
- && 双与，结果和 & 一样。左边为false，右边不执行。
- || 双或，结果和 | 一样。左边为true，右边不执行。

```java
a>b & a<c
a>b | a<c
a>b ^ a<c
!(a>b)

// & 和 && 的区别
int a = 10;
int b = 20;
// System.out.println( (a++ >10) & (b++ > 20) );  // false & false  a->11 b->21
System.out.println( (a++ >10) && (b++ > 20) );    // false & false  a->11 b->20
```











## 条件判断与循环语句

有三种条件语句:

```java
// 1
if(){
    do...
}

// 2
if(){
    do...
}else{
    do...
}

// 3
if(){
    do...
}else if(){
    do...
}else{
    do...
}

// 注意
int a = 2;
int b;
if(a > 1){
    b = 3
}else{
}

// 注意这里会报错，因为计算机不知道分支的情况，有可能没有给b赋值。不能使用没赋值的变量。
System.out.println("b:"+b);
```

intellij idea导包：
- 快捷键(推荐) alt + enter


**switch语句**

表达式可以是：byte、short、int、char、枚举、字符串。

```java
switch(表达式){
    case val1:
        do...;
        break;
    case val2:
        do...;
        break;
    default:
        do...;
        break;
}
```

**循环语句**


```java
for(int i=0; i < 10; i++){
    System.out.println(i);
}
```

水仙花数：是指一个三位数，其各位数字的立方等于该数本身。

```java
public class ForDemo2 {
    public static void main(String[] args) {
        for (int i = 100; i < 1000; i++) {
            int a = i % 10;
            int b = i / 10 % 10;
            int c = i / 100 % 10;

            if (a * a * a + b * b * b + c * c * c == i) {
                System.out.println(i);
            }
        }
    }
}
```


while循环。

```java
while(i < 10){
    do...;
    i++;
}
```

do...while循环。

```java
int i=5;
do{
   System.out.println(i); 
   i--;
}while(i<4);
```

break：中断循环语句，用在 switch、for循环中。
continue：跳到下次循环


Random: 产生随机整数

```java
import java.util.Random;
Random r = new Random(); // java.util.Random@511d50c0
// 数据范围:[0,10)，包括0，不包括10
int number = r.nextInt(10);
```

随机数小游戏。

```java
import java.util.Random;
import java.util.Scanner;

public class GameDemo {
    public static void main(String[] args) {
        Random r = new Random();

        int number = r.nextInt(100) + 1;

        while (true) {
            Scanner s = new Scanner(System.in);

            System.out.println("请输入要猜的数(1-100)：");

            int guessNumber = s.nextInt();

            if (guessNumber > number) {
                System.out.println("输入的数大了");
            } else if (guessNumber < number) {
                System.out.println("输入的数小了");
            } else {
                System.out.println("恭喜，猜中了");
                break;
            }
        }
    }
}
```

## 数组

初始化：
- 动态初始化：只给出长度，系统给出初始值,是地址值。
- 静态初始化：给出初始值，系统决定长度

```java
// 动态
int[] arr = new int[3];


```
































