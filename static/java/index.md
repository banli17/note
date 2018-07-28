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









































