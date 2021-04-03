---
title: java
---

## 注解

注解主要起到标识作用，是 JDK5.0 提出的，java 增加对元数据的支持，也就是注解 Annotation。

元数据是用来描述数据的数据，也就是描述代码之间关系，或代码与其它资源(数据库)之间关系的数据。

举例：struts ，元数据就是 struts-config.xml， hibernate 来说就是 hbm 文件。

JDK5.0 出来后，java 语言提出了四种类型：类 class、枚举 enum、接口 interface 和注解(@interface) 他们处于同一级别。

三个基本注解

- @Override: 限定重写父类的方法，该注解只能用于方法
- @Deprecated: 用来表示类或方法已过时
- @SupperessWarnings: 抑制编译器警告

## 简介

**编译型语言**

java 是编译型语言，文件后缀是`.java`，先由 javac 命令编译成字节码文件`.class`，再运行 java 命令执行。相对解释型语言来说编写、编译比较麻烦，但是执行速度快。

**跨平台性**

java 能跨平台，是依赖于 JVM 虚拟机。

**jre 和 jdk**

`jre` 全称是 java runtime evironment。它包含 JVM 和 java 核心库，是 java 的运行环境。

`jdk` 全称是 java development kit。它包含 jre，还包含一些命令程序如 javac、java 等。是开发 java 所必须的。

**配置环境变量 Path**

安装完 jdk 后，java 等命令只能在安装目录的 bin 下运行，要想让它在全局运行，需要配置全局变量。

1. 新增 `JAVA_HOME`指向 jdk 目录，而不是 bin 目录。
2. 在 Path 下新增 `%JAVA_HOME\bin;`

## 编写 HelloWorld

```java
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("HelloWorld");
    }
}
```

- class 是 java 的最小组成单位。
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
```

## 标志符

标志符可以由下面三种数据组成：

- unicode: 包含数字、英文、汉字
- 下划线 \_
- 美元符 \$

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

运算符就是用于对常量和变量进行操作的符号。表达式是用运算符连接起来的 java 语句的式子。

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

- & 与，有 false 则 false，左右都会执行。
- | 或，有 true 则 true
- ^ 异或，相同为 false，不同则 true
- ! 非，取反
- && 双与，结果和 & 一样。左边为 false，右边不执行。
- || 双或，结果和 | 一样。左边为 true，右边不执行。

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

intellij idea 导包：

- 快捷键(推荐) alt + enter

**switch 语句**

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

while 循环。

```java
while(i < 10){
    do...;
    i++;
}
```

do...while 循环。

```java
int i=5;
do{
   System.out.println(i);
   i--;
}while(i<4);
```

break：中断循环语句，用在 switch、for 循环中。
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

- 动态初始化：只给出长度。
- 静态初始化：给出初始值，系统决定长度。

```java
// 静态
int[] myInt = new Int[]{12, 13, 14};
int[] myInt = {12, 13, 14};

// 下面错误
int [] myInt;
myInt = {12, 13, 14};

// 动态
int[] arr = new int[3];
```

对于动态创建的数组元素：

- int 默认是 0
- char 默认是 空格
- boolean 默认是 false
- float 默认是 0.0
- 引用类型的变量，默认是 null，比如 String

数组一旦定义，数组长度无法改变。

```java
// 学生成绩小练习
package day4;

import java.util.Scanner;

public class ArrayStudentScore {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);

        System.out.println("请输入学生个数");
        int num = s.nextInt();
        int max = 0;

        int[] scores = new int[num];
        for (int i = 0; i < num; i++) {
            System.out.println("请输入学生" + (i + 1) + "的成绩：");
            int score = s.nextInt();
            scores[i] = score;

            if (max < score) {
                max = score;
            }
        }

        System.out.println("学生最高分是：" + max);
    }
}
```

### 多维数组

```java
int[][] score;
int[] score[];
int score[][];

// 1.二维数组初始化
score = new int[][]{{1,2,3},{3,4},{6}};  // 静态

score = new int[5][3];  // 动态1

score = new int[2][];  // 动态2
score[0] = new int[3];
score[1] = new int[3];
```

遍历二维数组

```java
for(int i=0;i<score.length;i++){
    for(int j=0;j<score[i].length;j++){

    }
}
```

打印杨辉三角

```java
public class Yanghui {
    public static void main(String[] args) {
        // 创建二维数组
        int[][] y = new int[10][];
        for (int i = 0; i < y.length; i++) {
            y[i] = new int[i + 1];
        }

        // 赋值
        for (int i = 0; i < y.length; i++) {
            for (int j = 0; j < y[i].length; j++) {
                y[i][0] = y[i][i] = 1;

                if (i > 1 && j > 0 && j < i) {
                    y[i][j] = y[i - 1][j] + y[i - 1][j - 1];
                }
            }
        }

        // 打印
        for (int i = 0; i < y.length; i++) {
            for (int j = 0; j < y[i].length; j++) {
                System.out.print(y[i][j] + "\t");
            }
            System.out.println();
        }
    }
}
```

数组的反转

```java
public class ArrayDemo4 {
    public static void main(String[] args) {
        int[] arr = new int[]{1, 2, 5, 9, 3};

        for (int i = 0; i < arr.length / 2; i++) {
            int temp = arr[i];
            arr[i] = arr[arr.length - 1 - i];
            arr[arr.length - 1 - i] = temp;
        }

        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
        }
    }
}
```

### 注意事项

1. 数据越界异常会报错，比如超出范围。java.lang.ArrayIndexOutOfBoundsException。
2. 空指针的异常。NullPointerException。

```java
boolean[] b = new boolean[3];
b = null;
System.out.println(b[0]);
```

## 面向对象

1. java 类及类的成员
2. 面向对象的三大特征
3. 其它关键字

## java 对象和类

### 基本概念

- 对象：类是一个实例。
- 类：是一个模板，描述一类对象的行为和状态。
- 局部变量：定义在方法里的变量。
- 成员变量：在类中、方法体外的变量。能被其它方法访问。在创建对象时实例化。
- 类变量：static 定义的变量。声明在类中，方法体外。

**构造函数**

每个类都有构造函数，没有显示定义，java 编译器会提供一个默认构造方法。在创建对象时，至少要调用一个构造方法。构造方法名必须和类同名。一个类可以有多个构造方法，根据参数区别调用哪个构造方法。

```java
public class Puppy{
    public Puppy(){}
    public Puppy(String name){}
}
```

**创建对象**

通过 new 关键字创建对象。步骤是：

1. 声明对象，包括对象名称和类型。
2. 通过 new 实例化对象。
3. 初始化：new 会调用构造方法初始化对象。

**实例变量和方法**

```java
public class Puppy{
   int puppyAge;
   public Puppy(String name){
      // 这个构造器仅有一个参数：name
      System.out.println("小狗的名字是 : " + name );
   }

   public void setAge( int age ){
       puppyAge = age;
   }

   public int getAge( ){
       System.out.println("小狗的年龄为 : " + puppyAge );
       return puppyAge;
   }

   public static void main(String []args){
      /* 创建对象 */
      Puppy myPuppy = new Puppy( "tommy" );
      /* 通过方法来设定age */
      myPuppy.setAge( 2 );
      /* 调用另一个方法获取age */
      myPuppy.getAge( );
      /*你也可以像下面这样访问成员变量 */
      System.out.println("变量值 : " + myPuppy.puppyAge );
   }
}
```

## 源文件声明规则

- 一个源文件只能有一个 public 类。
- 一个源文件可以有多个非 public 类。
- 源文件名称应和 public 类名称一致。
- 如果一个类定义在某个包中，那么 package 语句应放在源文件首行。
- import 要放在 package 和 类定义之间。

**java 包**

包主要用于对接口和类进行分类。

**import 语句**
在 Java 中，如果给出一个完整的限定名，包括包名、类名，那么 Java 编译器就可以很容易地定位到源代码或者类。Import 语句就是用来提供一个合理的路径，使得编译器可以找到某个类。

## java 修饰符

修饰符分 2 类：

- 访问修饰符
- 非访问修饰符

### 访问控制修饰符

- default（默认什么都不写）：同一包可见，可使用于类、接口、变量、方法
- private：在同一类可见，可用于变量、方法
- public：对所有类可见，可用于类、接口、变量、方法
- protected：对同一包内的类和所有子类可见，可用于变量、方法

默认，接口里的变量隐式声明为`public static final`。方法是`public`。
