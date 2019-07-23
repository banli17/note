---
title: 基础
date: 2019-01-06 09:33:45
tags:
---

## php标记

`<?php`和`?>`之间得代码才会被php解析。之外的部分会被忽略。

可以使用短标记：`<?`和`?>`，但不鼓励使用。需要打开`php.ini`的`short_open_tag`配置，或者编译 php 时使用`--enable-short-tags`。

如果文件内容是纯 PHP 代码，最好在文件末尾删除 PHP 结束标记。这可以避免在 PHP 结束标记之后万一意外加入了空格或者换行符，会导致 PHP 开始输出这些空白，而脚本中此时并无输出的意图。

```php
<?php
echo "Hello world";

// ... more code

echo "Last statement";

// 脚本至此结束，并无 PHP 结束标记
```

## 从HTML中分离

凡是在一对开始和结束标记之外的内容都会被 PHP 解析器忽略，这使得 PHP 文件可以具备混合内容。 可以使 PHP 嵌入到 HTML 文档中去。

```php
<?php if ($expression == true): ?>
  This will show if the expression is true.
<?php else: ?>
  Otherwise this will show.
<?php endif; ?>
```

上面通过条件来忽略段落，如果要输出大段内容，上面的方式比`echo`或`print`更有效。

php有四种标记：
- `<?php ?>`: 始终有效，推荐使用
- `<script language="php"></script>`: 始终有效
- `<? ?>`: 短标签，需要`php.ini`开启。方便但是移植性差，不推荐使用
- `<% %>`: ASP风格，需要`php.ini`开启

PHP 5.4起，短标记`<?= ?>`始终有效，而不管`short_open_tag`。

PHP每个语句后面都需要加分号结束指令。

## 注释

```
/* */
// 
# 
```

单行注释仅仅注释到行末或者当前的 PHP 代码块，视乎哪个首先出现。这意味着在 // ... ?> 或者 # ... ?> 之后的 HTML 代码将被显示出来。

```php
<h1>This is an <?php # echo 'simple';?> example</h1>
```

上面php代码不会显示。

## 数据类型

php支持9种原始数据类型。

4种标量类型：

- boolean
- integer: 整数最大值为PHP_INT_MAX
- float(也叫double)
- string

3种复合类型:

- array
- object
- callable

2种特殊类型：

-resource
- NULL

查看变量的类型：

- `var_dump()` 可以看到类型和值
- `gettype()` 用于调试，会得到一个易懂的类型表达，返回类型
- `is_type()` 用于检查某个类型，如`is_string()`，`is_int()`

## 强制转换变量类型

- `settype($var, string $type)`:返回布尔值，成功返回TRUE，失败返回FALSE。

### 转布尔值

通过`(bool)`或`(boolean)`可以强制转换，但是一般不需要，因为如判断都会自动转换。

```php
var_dump((bool) "");        // bool(false)
```

当转布尔值时，下面值是FALSE：

- FALSE
- 0
- 0.0
- '' 和 '0'
- 空数组
- NULL和未赋值的变量
- 空标记生成的SimpleXML对象

### Integer 整型

整型可以用十进制、十六进制(0x)、八进制(0)或二进制(0b)表示。

整型数的字长和平台有关，尽管通常最大值是大约二十亿（32 位有符号）。64 位平台下的最大值通常是大约 9E18。除了 Windows 下 PHP 7 以前的版本，总是 32 位的。

最大值：PHP_INT_MAX，最小值: PHP_INT_MIN，字长：PHP_INT_SIZE。

如果一个数超过了整数范围，会被当作 float。

```php
<?php
$large_number = 2147483647;
var_dump($large_number);                     // int(2147483647)

$large_number = 2147483648;
var_dump($large_number);                     // float(2147483648)

$million = 1000000;
$large_number =  50000 * $million;
var_dump($large_number);                     // float(50000000000)
?>
```

可以使用(int)或(integer)强制转换，还可以通过intval()。resource 转 int 时，会返回唯一资源号。

FALSE 转为0，TRUE转成 1。浮点数转int，会向下取整数(最好用`round()`)，如果浮点数超出整数范围，则返回未定义。

php7开始 NaN和Infinity转 int 时，会变为0。

### 浮点数Float

浮点型：也叫float、double 或 real(实数)。浮点数的字长和平台相关，尽管通常最大值是 1.8e308 并具有 14 位十进制数字的精度（64 位 IEEE 格式）。

浮点数的精度有限。尽管取决于系统，PHP 通常使用 IEEE 754 双精度格式，则由于取整而导致的最大相对误差为 1.11e-16。floor((0.1+0.7)*10) 通常会返回 7 而不是预期中的 8。如果确实需要更高的精度，应该使用[任意精度数学函数](http://php.net/manual/zh/ref.bc.php)或者 [gmp 函数](http://php.net/manual/zh/ref.gmp.php)。

- 如果试图将对象转换为浮点数，会发出一条 E_NOTICE 错误消息。

因为浮点数有误差，所以比较浮点数用下面的方法：

```php
<?php
$a = 1.23456789;
$b = 1.23456780;
$epsilon = 0.00001;

if(abs($a-$b) < $epsilon) {
    echo "true";
}
?>
```

NaN 和 js 一样。通过`is_nan()`来检查。

### Array




### Object

对象就是 new 出来的实例。如果其它任何类型的值被转换成对象，将会创建一个内置类 stdClass 的实例。如果该值为 NULL，则新的实例为空。 array 转换成 object 将使键名成为属性名并具有相对应的值。

```php
$a = 1;
$b = (object) $a;
var_dump($b);  // object(stdClass)#1 (1) { ["scalar"]=> int(1) }

$obj = (object) array('1' => 'foo');
var_dump(isset($obj->{'1'})); // PHP 7.2.0 后输出 'bool(true)'，之前版本会输出 'bool(false)' 
var_dump(key($obj)); // PHP 7.2.0 后输出 'string(1) "1"'，之前版本输出  'int(1)' 
```

对于其他值，会包含进成员变量名 scalar。

### Resource 资源类型

资源 resource 是一种特殊变量，保存了到外部资源的一个引用。由于资源类型变量保存有为打开文件、数据库连接、图形画布区域等的特殊句柄，因此将其它类型的值转换为资源没有意义。


### NULL

NULL 类型只有一个值，就是不区分大小写的常量 NULL。特殊的 NULL 值表示一个变量没有值。下面3种情况变量会是 NULL:

- 被赋值为 NULL。
- 尚未被赋值。
- 被 unset()。

可以通过`is_null()`检查变量是否是 NULL。

使用`(unset) $var`将一个变量强制转换为 null，这不会删除该变量或 unset 其值。仅是返回 NULL 值而已。

```php
$a = array();

$a == null  <== return true
$a === null < == return false
is_null($a) <== return false
```

### Callable/Callback类型

就是回调函数，一些方法：`call_user_func()`或`usort()`可以接受回调函数做参数。回调函数可以是简单函数、对象方法、静态类方法。

`call_user_func(callback,param1...)`和 js 的 call() 类似。不过它是以字符串形式传递的，可以传递任何函数，除了语言结构: array()，echo，empty()，eval()，exit()，isset()，list()，print 或 unset()。

`call_user_func_array(callback, param_arr)`和 js 中的 apply类型。

```php
<?php 
function my_callback_function() {
    echo 'hello world!';
}

class MyClass {
    static function myCallbackMethod() {
        echo 'Hello World!';
    }
}

//  1: 普通函数
call_user_func('my_callback_function'); 

// 2: 静态类方法
call_user_func(array('MyClass', 'myCallbackMethod')); 

// 3: 对象方法
$obj = new MyClass();
call_user_func(array($obj, 'myCallbackMethod'));

// 4: 静态类方法(PHP 5.2.3)
call_user_func('MyClass::myCallbackMethod');

// 5: static(PHP 5.3.0)
class A {
    public static function who() {
        echo "A\n";
    }
}

class B extends A {
    public static function who() {
        echo "B\n";
    }
}

call_user_func(array('B', 'parent::who')); // A

// Type 6: 对象__invoke会默认当作回调方法 (since PHP 5.3)
class C {
    public function __invoke($name) {
        echo 'Hello ', $name, "\n";
    }
}

$c = new C();
call_user_func($c, 'PHP!');
?>
```

### Closure

```php
<?php
// Our closure
$double = function($a) {
    return $a * 2;
};

// This is our range of numbers
$numbers = range(1, 5);

// Use the closure as a callback here to 
// double the size of each element in our 
// range
$new_numbers = array_map($double, $numbers);

print implode(' ', $new_numbers);
?>
```

- `range(m, n)`:生成一个 m 到 n 的数组
- `array_map(fn, arr)`: 遍历数组
- `implode($glue, arr)`: 将一个一维数组的值用 $glue 拼接为字符串


## 类型转换

## 类型比较表

## 变量

php中变量名是区分大小写的，用`$varname`表示。

```php
$var = 'Bob';
$Var = 'Joe';
echo "$var, $Var";      // 输出 "Bob, Joe"
```

单引号和双引号的区别是双引号里的变量会解析。

```php
$a = 'hello';

echo '$a';  // '$a'
echo "$a";  // 'hello'
```

基本类型赋值是拷贝赋值，引用类型是引用赋值，这个和 js 一样。不过它可以将一个基本类型数据的也使用引用赋值，通过&。

```php
$foo = 'bob';
$bar = &$foo;
$bar = 'hello';  // 这里是将地址指向的内容修改了

echo $bar;
echo $foo;

// 注意，只有有名字的变量才能引用赋值
// 下面是错误的
$bar = &(22 + 2);
$bar = &test();
```

对于没有初始化的变量，它有个初始值：

- 布尔值是FALSE
- 整型和浮点型是0
- 字符串型是''
- 数组是空数组

```php
<?php
// Unset AND unreferenced (no use context) variable; outputs NULL
var_dump($unset_var);

// Boolean usage; outputs 'false' (See ternary operators for more on this syntax)
echo($unset_bool ? "true\n" : "false\n");

// String usage; outputs 'string(3) "abc"'
$unset_str .= 'abc';
var_dump($unset_str);

// Integer usage; outputs 'int(25)'
$unset_int += 25; // 0 + 25 => 25
var_dump($unset_int);

// Float/double usage; outputs 'float(1.25)'
$unset_float += 1.25;
var_dump($unset_float);

// Array usage; outputs array(1) {  [3]=>  string(3) "def" }
$unset_arr[3] = "def"; // array() + array(3 => "def") => array(3 => "def")
var_dump($unset_arr);

// Object usage; creates new stdClass object (see http://www.php.net/manual/en/reserved.classes.php)
// Outputs: object(stdClass)#1 (1) {  ["foo"]=>  string(3) "bar" }
$unset_obj->foo = 'bar';
var_dump($unset_obj);
?>
```

可以关闭 register_globals，这样使用未初始化的变量会报错。isset()可以检查一个变量是否已经初始化。

### 变量作用域

1. 变量在 include 和 require 引入文件里也生效。

```php
$a = 1;
include 'b.inc';  // 变量 a 在 b.inc 里有效
```

2. 外层变量在函数里无效，这个和 js 不同。

```php
// 全局定义
$a = 1;

function c(){
    // 局部的a
    echo $a;  // ''，不会向上搜索$a
}
```

3. 如果要在函数里使用外层变量$a，需要使用 global 关键字告诉作用域，这个 $a 是全局的 $a。

```php
<?php
$a = 1;
$b = 2;

function Sum()
{
    global $a, $b;

    $b = $a + $b;
}

Sum();
echo $b;
?>
```

4. 在全局范围内访问变量还可以使用 $GLOBALS 数组。外层的全局变量会当作这个数组的一个项。

```php
<?php
$a = 1;
$b = 2;

function Sum()
{
    $GLOBALS['b'] = $GLOBALS['a'] + $GLOBALS['b'];
}

Sum();
echo $b;
?>
```

$GLOBALS 之所以有效，是因为它是超全局变量。大多数预定义变量并不是超全局变量，所以需要使用 global。

```php
<?php
function test_global()
{
    // 不是超全局变量，所以需要 global
    global $HTTP_POST_VARS;

    echo $HTTP_POST_VARS['name'];

    // 是超全局变量，所以不需要 global 声明(也就是可省略global)
    echo $_POST['name'];
}
?>
```

### 静态变量

静态变量仅在局部函数域中存在，但当程序执行离开此作用域时，其值并不丢失。看例子：

```php
<?php
function test()
{
    $a = 0;
    echo $a;
    $a++;
}
?>
```

上面这段代码，$a 是一个普通变量，函数执行完作用域销毁，变量就不存在了。所以 $a 没什么用，不能保存数据。

```php
<?php
function test()
{
    static $a = 0;
    echo $a;
    $a++;
}
?>
```

如果使用了 static 关键字，这个变量就是静态变量了，每次执行 test()，$a 都会加 1。(这个和js闭包有点像，也就是函数作用域不会销毁，常驻内存中)。也就是多次运行 test() 函数的时候，$a 不会重新声明和赋值。

静态声明是在编译时解析的。所以只能直接赋值，而不能用表达式：

```php
function foo(){
    static $int = 0 ;        // 正确

    static $int = 1 + 2;     // 错误
    static $int = sqrt(123); // 错误
}
```

### 全局和静态变量的引用

对于变量的 static 和 global 定义是以引用的方式实现的。例如，在一个函数域内部用 global 语句导入的一个真正的全局变量实际上是建立了一个到全局变量的引用。这有可能导致预料之外的行为。

```php
<?php
$a = 1;

function b (){
    global $a;
    $b = 3;
    $a = &$b;  // 将 $a 重新指向了一个对象
    $a = 2;
    echo $b;  // 输出2
}

b();
echo $a;  // 输出1
```

上面代码中，重新将一个引用赋值给静态变量，这个 $a 和外层的`global $obj`就断了连接，没关系了，$a 就变成一个普通变量了。static 也有这种情况，引用不是静态存储的。

```php
function a(){
    static $i = 0;
    $b = 1;
    $i = &$b;
    $i = 2;
    echo $i++;
}

a();  // 2
a();  // 2
a();  // 2
```

上面的代码输出 3 个 2，因为 $i 地址发生了改变，这个 $i 就相当于不是静态变量，而是普通变量了。所以 $i 始终是 2。

### 可变变量

可以通过一个变量来设置另一个变量的名字。

```php
$a = 'hello';
$$a = 'hi';

echo $hello;   // 'hi'
echo "${$a}";  // 'hi'
```

可以使用大括号{}包起来，这样解析器会将它当作整体来解析。比如`${$a[1]}`是一个变量，而`${$a}[1]`是数组的第一项。

类的属性也可以通过可变属性名来访问。可变属性名将在该调用所处的范围内被解析。例如，对于 $foo->$bar。

注意，在 PHP 的函数和类的方法中，超全局变量不能用作可变变量。$this 变量也是一个特殊变量，不能被动态引用。

## 来自PHP之外的变量

提交表单时，表单中的信息自动在脚本中可用。如:

```php
$_GET['id']
$_POST['username']
$_REQUEST['username'];
```

变量名中的点和空格被转换成下划线。例如`<input name="a.b" />`变成了`$_REQUEST["a_b"]`。

`extract(array, flags, prefix)`可用将一个数组中的键转成变量，处理方式受 flags，prefix 影响。

```php
<?php

/* 假定 $var_array 是 wddx_deserialize 返回的数组*/

$size = "large";
$var_array = array("color" => "blue",
                   "size"  => "medium",
                   "shape" => "sphere");
extract($var_array, EXTR_PREFIX_SAME, "wddx");

echo "$color, $size, $shape, $wddx_size\n";
?>

// 输出blue, large, sphere, medium
```

一个复杂的表单：

```php
<?php
if (isset($_POST['action']) && $_POST['action'] == 'submitted') {
    echo '<pre>';

    print_r($_POST);
    echo '<a href="'. $_SERVER['PHP_SELF'] .'">Please try again</a>';

    echo '</pre>';
} else {
?>
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    Name:  <input type="text" name="personal[name]"><br />
    Email: <input type="text" name="personal[email]"><br />
    Beer: <br>
    <select multiple name="beer[]">
        <option value="warthog">Warthog</option>
        <option value="guinness">Guinness</option>
        <option value="stuttgarter">Stuttgarter Schwabenbr</option>
    </select><br />
    <input type="hidden" name="action" value="submitted" />
    <input type="submit" name="submit" value="submit me!" />
</form>
<?php
}
?>

// 上面的格式：
Array
(
    [personal] => Array
        (
            [name] => 321
            [email] => 321
        )

    [beer] => Array
        (
            [0] => warthog
        )

    [action] => submitted
    [submit] => submit me!
)
```

**image submi变量名**

```php
<input type="image" src="image.gif" name="sub" />
```

上面的按钮也可以用于提交，会加上两个变量 sub_x 和 sub_y，表示点击图像的坐标。PHP是自动将 sub.x 转成了 sub_x。

**http cookies**

setcookie() 可用用来设置 cookies，Cookie 数据会在相应的 cookie 数据数组中可用，例如 $_COOKIE，$HTTP_COOKIE_VARS 和 $_REQUEST。

如果要将多个值赋给一个 cookie 变量，必须将其赋成数组。

```php
<?php
  setcookie("MyCookie[foo]", 'Testing 1', time()+3600);
  setcookie("MyCookie[bar]", 'Testing 2', time()+3600);
?>
```

这将会建立两个单独的 cookie，尽管 MyCookie 在脚本中是一个单一的数组。如果想在仅仅一个 cookie 中设定多个值，考虑先在值上使用 serialize() 或 explode()。

注意在浏览器中一个 cookie 会替换掉上一个同名的 cookie，除非路径或者域不同。因此对于购物车程序可以保留一个计数器并一起传递

```php
<?php
if (isset($_COOKIE['count'])) {
    $count = $_COOKIE['count'] + 1;
} else {
    $count = 1;
}
setcookie('count', $count, time()+3600);
setcookie("Cart[$count]", $item, time()+3600);
?>
```








## 常量

常量的值在脚本执行期间不能改变。默认大小写敏感。常量的作用域是全局有效的。

```php
define('FOO', 'something');

// 不要像下面一样，可能会和魔术常量冲突
define('__FOO__', 'something');
```

### 魔术常量

PHP里预置了很多常量，有些常量是扩展库定义的，只有加载对应的扩展库才有。

8个魔术常量：

- `__LINE__`: 文件中当前行号。
- `__FILE`: 文件的完整路径和文件名，是一个绝对路径。
- `__DIR`: 文件所在目录。等价于`dirname(__FILE__)`，除非是根目录，否则目录末尾不会带/。
- `__FUNCTION__`: 函数名称，区分大小写。在函数内部有效，否则返回空字符串。
- `__CLASS__`: 类的名称。
- `__TRAIT__`: Trait 名称。
- `__METHOD__`: 类的方法名。
- `__NAMESPACE__`: 当前命名空间的名称（区分大小写）。

```php
class trick
{
      function doit()
      {
            echo __FUNCTION__;
      }
      function doitagain()
      {
            echo __METHOD__;
      }
}
$obj=new trick();
$obj->doit();
output will be ----  doit
$obj->doitagain();
output will be ----- trick::doitagain
```

如果一个类没有定义构造函数，它的同类名（不区分大小写）函数会被当作构造函数。

```php
class A{
    function a(){
        echo __METHOD__;
    }
}

new A();  // A::a
```

几个相关的方法：

- `get_class ([ object $object = NULL ] ) : string`: 获取对象的类名，如果不是对象会报错。
- `get_object_vars ( object $obj ) : array`:
- `file_exists($filname):bool`: 文件或目录是否存在，返回TRUE或FALSE。
- `function_exists()` 