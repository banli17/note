---
title: 面向对象编程
---

## 简介

面向对象的 4 大特性：

-   抽象
-   封装
-   继承
-   多态

## 类

### 属性和方法

属性和方法分为：

-   静态属性(或类属性)
-   静态方法(或类方法)
-   实例属性(或成员属性)
-   实例方法(或成员方法)

静态属性和静态方法，是类本身的属性，在类第一次被使用时进行初始化，并且只初始化一次。

静态属性和方法通过 static 关键字来定义，一般语言(如 JavaScript) 都是只支持通过`className.staticProperty`和`className.staticMethod()` 的方式来使用。

> 注: 在 Java 中，静态属性和方法还可以通过 `instance.staticProperty` 和 `instance.staticMethod()` 的方式来使用，但是不建议这样做，因为这种用法容易和实例属性混淆。

实例属性和方法是属于实例对象的，通过 `instance.staticProperty` 和 `instance.staticMethod()` 的方式来使用，每个实例对象都会有一份各自的实例属性，而会共用一份方法体代码。

下面是各个语言的类属性的定义和使用方法。

```java title="A.java"
public class A {
    // 静态属性
    static int age = 12;
    // 实例属性
    String name = "张三";

    // 静态方法
    static void say() {
        System.out.println("hello world!");
    }
    // 实例方法
    void job(){
        System.out.println("job");
    }

    public static void main(String[] args) {
        System.out.println(A.age);  // 12
        A.say();

        A a = new A();

        /** 在 java 中，可以通过实例调用静态属性和方法 **/
        System.out.println(a.age);  // 12  可以通过实例正确调用
        a.say();  // "hello world!"

        /** 调用实例属性和方法 **/
        System.out.println(a.name);  // "张三"
        a.work();  // "job"
    }
}
```

```js title="A.js"
class A {
    static age = 12;
    name = "张三";

    static say() {
        console.log("hello world!");
    }

    job() {
        console.log("job");
    }
}

console.log(A.age); // 12
A.say(); // "hello world!"

const a = new A();

/** 不能通过实例调用静态属性和方法 **/
console.log(a.age); // undefined
a.say(); // 报错 TypeError: a.say is not a function

console.log(a.name); // "张三"
a.job(); // "job"
```

### 实例的创建

### 构造函数

## 封装

### 访问控制符

为了封装，一般语言使用了访问修饰符来控制访问权限。Java 里访问修饰符有 4 个：

-   默认
-   public
-   protected
-   private

关系图如下：

-   类
-   属性、方法访问权限

JavaScript 之前并不直接支持私有属性和方法，es11 终于推出了私有属性和方法，就是在属性和方法前加`#`。Ruby 是使用 `@` 表示私有属性，但是在 JavaScript 中，`@` 已经被装饰器 Decorator 占用了。

如果在 class 外使用私有属性或方法，会报错：

![](imgs/2020-06-08-16-11-59.png)

## 继承

### 类继承和原型继承

### super

### Mixin

JavaScript

## 组合

## 多态
