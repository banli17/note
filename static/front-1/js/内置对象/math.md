# Math对象

## 对象属性

```
Math.E   算数常量，自然对数的底数(约等于2.718)
Math.LN2   loge2 = 0.693
Math.LN10  loge10 = 2.302
Math.LOG2E   返回以 2 为底的 e 的对数（约等于 1.414）。
Math.LOG10E	返回以 10 为底的 e 的对数（约等于0.434）。
Math.PI     返回圆周率（约等于3.14159）。
Math.SQRT1_2  返回返回 2 的平方根的倒数（约等于 0.707）。
Math.SQRT2   返回 2 的平方根（约等于 1.414）。
```

## 对象方法

**常用**
- abs(x)： 返回绝对值
- ceil(x)：向上取整
- floor(x)：向下取整
- max(x, y)：返回x和y中的最高值
- min(x, y)：返回x和y中的最小值
- pow(x, y)：返回x的y次幂
- random()：返回[0, 1)之间的随机数
- round(x)：四舍五入
- sqrt(x)：返回数的平方根
- toSource()：返回该对象的源代码，网上有误，测试是undefined
- valueOf()：返回Math对象的原始值

**数学中**
- acos(x)：返回数的反余弦值。
- asin(x)：返回数的反正弦值。
- atan(x)：以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。
- atan2(y, x)：返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。
- sin(x)：返回数的正弦
- cos(x)：返回数的余弦
- tan(x)：返回角的正切
- exp(x)：返回e的指数
- log(x)：返回数的自然对数，以e为底

## 应用

1. 获取1-10之间的随机整数，包括1和10

```
Math.floor(Math.random()*10+1)
```

2. 获取数组中的最小数

```
var a = [1, 4, 6, 10, 0, 7]
var min = Math.min.apply(null, a)
```

通过apply借用Math的min方法进行获取最小值。

3. 常用的还有向上取整、向下取整、四舍五入。
