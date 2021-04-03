---
title: 数组
---

数组实际是一个有序映射。

- 索引数组：下标是数字
- 关联数组：下标是字符

php 中的数组是不区分索引和关联的，都是通过 key 找到 value。

## 定义

- array()

```php
// 1. array()
$arr = array();

var_dump($arr);
// gettype() 得到变量类型
echo gettype($arr);
// 通过is_array()检测变量是否为数组
var_dump(is_array($arr));

$arr = arr(1,2.2,'king',true);
print_r($arr);

$arr = arr(2=>'a','5'=>'king',true);

$username = array(
    'username'=>'king',
    'age'=>12,
    -12=>'a',
    ''=>'b',
    true=>'c',        // key转1
    false=>'d',       // key转0
    null=>'e'         // key转''
);
```

如果新添加元素没有下标，则下标为已有最大值下标加 1。(已有下标不全为负数)。

以后下标都是负数，则新添加元素下标是 0。

键名：

- 使用合法的数字字符串
- 浮点数会取整
- true -> 1，false -> 0
- null -> ''
- 键名重复，后面会覆盖前面
- 没有指定 key，键名不都为负数，则为最大 key 加 1，或 0

## 多维数组

```php
$arr = array(
    array('a', 'b', 'c'),
    array('d', 'b', 'c'),
);
```

## 动态创建数组

```php
$arr[] = 2;
$arr[] = 3;
$arr[3] = 3;
$arr[] = 9;
// 0,1,3,4

$arr[][][][] = 1;
```

## 快速创建数组

- `range()`

```php
// 创建连续的数组，range(start,end,step)
$arr = range(1,10);

range('a','z');    Ascii

for($i=97;$i<=122;$i++){  // a-z
    $arr[] = chr($i);
}
```

- `compact()`:根据变量名生成数组,只会出现有的变量。

```php
$user = 'hi';
$age = 'bb'
$data = compact('user','age','gender');  // Array(a=>'hi',b=>'bb')
```

## 定义常量数组

- `define()`

const 在 5.6 之后可以定义常量。

```php
const A = arr('a','b');
const A = [
    'a'=>'aa',
    'b'=>'bb'
];

// 变量名可以是变量，第三个参数可以为true指定变量名大小写不敏感
define('CUSTOM_UPLOAD_ERRORS', [
    'ext_error'=>'上传文件扩展名不符合规范'
])

```

## 使用数组

获取数组

```php
header('content-type:text/html;charset=utf-8');

$arr[0];
$arr['name'];
$arr[0]['name'];

//也可以使用 {}
$arr{0}{'name'};

// 添加元素
$arr=['a','b'];
$arr[] = 'd';
$arr['test'] = 'e';

// 修改元素
$arr[0] = 'aa';

// 删除元素，删除之后，数组的索引不变，不会向前移动
unset($arr['test']);
```

## 转换

- 一个值转成数组，只会得到一个元素，索引是 0

```php
// 临时转换，null会转换为空数组，其它会转为一个元素的数组
$var = 1;
$res = (arr)$var;

// 永久转换
settype($var, 'array');
var_dump($var);
```

## 数组运算符

- 合并数组: 如果 key 相同，则会只使用前面的数组。

```php
$arr1  = ['a'];
$arr2  = ['b'];
$arr = $arr1 + $arr2;  // ['a']

```

== 比较键名,键值相同，类型可以不同
== 比较键名,键值,顺序,类型相同
!= <> 取反
!== 取反

## 数组的遍历

- count() 返回数组的个数

```php
$arr = [1, 2, 3];

// for循环只能遍历下标循环的索引数组
for ($i = 0, $count = count($arr); $i < $count; $i++) {
    echo $arr[$i];
}

// foreach 能作用于数组和对象
foreach($arr as $val){

}

foreach($arr as $key=>$val){

}

// php7
foreach($arr as $key=>$val):

endforeach;
```

php7 变化:

- foreach 不再改变数组的指针。
- current(\$arr):数组当前的指针。
- foreach 遍历值时，操作的是数组的副本。
- 按照引用进行循环的时候，对数组的修改会影响循环，比如在循环里增加元素，还会遍历到。

```php
foreach ($arr as $key => $val) {
    var_dump($val);
    if ($key == 0) {
        $val['name'] = 22;
    }
    var_dump($val);
}

//array(1) { [0]=> array(1) { ["name"]=> string(3) "age" } }
var_dump($arr);
```

## 常用 API

```php
// 求和
$string = '2,3,5,19,30';
$arr = explode(',', $string);
echo array_sum($arr);      // 计算数组所有元素的和
echo array_product($arr);  // 计算数组所有元素的乘积

// example2
$allowExts = ['jpg','jpeg','gif','png'];
$filename = "1.txt.php.jpg";
$arr = explode('.', $filename);
$ext = end($arr);
var_dump(in_array($ext, $allowExts));

//
array_push()
array_pop()
array_unshift()
array_shift()

// 快速生成字符串
$a = join('', range(0,9));
$b = join('', range('a','z'));
$c = join('', range('A','Z'));
$newArr = array_merge($a, $b, $c);

// 生成四位验证码
$str = '';
for($i=1;$i<=4;$i++){
    $str .= $newArr[mt_rand(0, count($newArr)-1)];
}
echo $str;

// array_flip() 交换数组的键值
$res=array_rand(array_flip($newArr), 4);
echo join('', $res);

// 或者打乱顺序，取前四位
shuffle($newArr);


array_keys()
array_values()
// 将用户信息插入数据库中
$username = $_POST['username'];
$age = $_POST['age'];
$userInfo = compact['username','age];
// Insert user(username, age) VALUES('aa',12)
$keys = join(',', array_keys($userInfo));
$vals = "'".join(',', array_keys($userInfo))."'";
$sql = "INSERT user({$keys}) VALUES({$vals})";
echo $sql;
```
