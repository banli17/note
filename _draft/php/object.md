---
title: php手册学习(3) - 类与对象
date: 2018-07-18 12:37:46
tags:
---

## 基本概念

### class

php 定义 class 的语法和 js 一样，它的类名取名需要符合正则表达式：`[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*`。

class 可以有自己的常量、属性(也叫变量)和方法。

class 里的`$this`指的是实例对象，如果是类调用，则不存在`$this`。

```php
<?php
class A
{
    function foo()
    {
        if (isset($this)) {
            echo '$this is defined (';
            echo get_class($this);
            echo ")\n";
        } else {
            echo "\$this is not defined.\n";
        }
    }
}

class B
{
    function bar()
    {
        A::foo();
    }
}

$a = new A();
$a->foo();

A::foo();

$b = new B();
$b->bar();

B::bar();
?>
```

在 php7 中输出如下：

```
$this is defined (A)
$this is not defined.
$this is not defined.
$this is not defined.
```

调用类方法，使用`className::fn()`。定义的方法，在class和实例上都有。

创建对象需要使用关键词 new。如果创建对象时，在构造函数里抛出错误，那么这个变量不会被赋值。

```php
class A{}
// 方式1
$a = new A();

// 方式2 
$b = 'A';
$c = new $b();
```

在类的内部，可以使用 new self 和 new parent 创建对象。

```php
<?php
class A{
    function b(){
        return new self();
    }
}

$a = new A();
print_r($a->b());  // A Object()
```

将一个对象赋值给另一个新变量的是引用，这样两个变量都指向同一个内存。通过&可以将地址赋值给新变量，这样新变量的值是一个地址(下面例子是重点)。

```php
<?php

class A {
    public $c = 'hello';
}
$a = new A();
$b = $a;
$c = &$a;

$a->c = 'hi';
$a  = null;

var_dump($a);  // NULL
var_dump($b);  // {c=>hi}
var_dump($c);  // NULL
```

php5.3.0引入了两个新方法来创建对象的实例：
1. 通过在类方法里返回`new static`。
2. 通过 new 一个对象，会创建这个对象的类的实例。

```php
class A{
    public function getObj(){
        return new static;
    }
}
class B extends A{}
$a = new A();
$b = new $a();  // 会创建一个A的实例

$c = A::getObj();  // 创建一个A的实例
var_dump($c instance A); // true

$d = B::getObj();  // 创建一个A的实例
var_dump($d instance B); // true
```

访问新创建成员，用括号包起来：

```php
<?php
echo (new DateTime())->format('Y');  // 2019
```

class 的属性和方法存放在不同的命名空间中，所以可以有同名的属性和方法。所以调用属性还是方法取决于调用的方式(即属性是`$o->a`，而方法是`$o->a()`)。

```php
<?php
class A
{
    public $a = 'property';

    public function a(){
        return 'method';
    }
}
$o = new A();
echo $o->a, PHP_EOL, $o->a(), PHP_EOL;
```

`PHP_EOL`是PHP中一个已经定义好的换行符。会根据平台变化，因此unix系列用 /n，windows系列用 /r/n，mac用 /r。

所以如果一个属性是匿名函数，不能直接调用。除非将它分配给另一个变量。在php7，改成可以用`()`包起来直接调用匿名函数。

```php
class A
{
    public $a;

    public function __construct(){
        $this->a = function(){
            return 11;
        }
    }
}

$o = new A();

// php5.3.0
$func = $o->a;
echo $func(), PHP_EOL;

// php7.0
echo ($o->a)(), PHP_EOL;
```

## extends

一个 class 可以使用 extends 继承另一个 class 的方法。PHP不支持多重继承，一个类只能继承一个基类。

子类可以用同名方法覆盖父类的方法，但是如果父类的方法使用了 final 关键字，则不能被覆盖。可以通过`parent::`来访问被覆盖的方法和属性。

当覆盖方法时，参数必须保持一致否则会报错，但是构造函数可以使用不同的参数。

```php
<?php
class A{
    function displayVar(){
        echo 'hello';
    }
}

class B extends A{
    // 覆盖父类方法
    function displayVar(){
        echo "Extends class\n";
        parent::displayVar();
    }
}

$b = new B();
$b->displayVar();
```

## ::class

从php5.5起，class也可以用于类名的解析，使用`ClassName::class`可以得到一个包含ClassName的完全限定名称。这对于使用了命名空间的类很重要。

```php
<?php
namespace NS{
    class A{

    }
    echo A::class;  // NS\A
}
```

`::class`是编译时转换，所以创建类名字符串时，类还不存在。如果类不存在它也不会报错。比如将`class A`注释掉，依然会返回 `NS\A`

## 属性

属性声明用关键字：public(默认)、protected 或 private 开头。属性中的变量可以初始化，但是必须时个常量(编译阶段就可以得到值，而不依赖与运行)。所以不能是表达式如：`1+1`;








**echo与print，var_dump()和print_r()的区别**

echo和print都不是严格意义的函数，而是语言结构，只能输出基本类型，不能打印复合类型和资源。echo可以连续输出多个变量，print一次只能输出一个，print打印的值可以直接赋值给另一个变量：`$a = print '123';`。`echo()`比`print()`稍快。

`var_dump()`和`print_r()`都可以打印数组，对象之类的复合型变量。print_r() 只会输出一些容易理解的信息，而且在打印数组时会把数组指针移动到最后面，使用reset() 可以恢复。var_dump() 不但能打印复合类型，还能打印资源，输出信息也详细些，一般用于调试。


