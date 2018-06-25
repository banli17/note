# underscore

- [中文api手册](http://www.css88.com/doc/underscore/)
- https://github.com/hanzichi/underscore-analysis

## 箭头函数

```
;(()=> {
	console.log(arguments)  // 实际是指向function(export)这样的函数
})(1, 2);
```

arguments,this,super是指向离他最近的非箭头函数定义。


## void

void运算符对给定的表达式进行求值，返回undefined。好处是:
- 避免低版本全局undefined被重写
- 高级浏览器局部undefined被重写
- 减少字符数。
- url href
- void function(){}()，将函数转函数表达式，而不是声明

- [void 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)
- [从用 void 0 代替 undefined 说起](http://web.jobbole.com/86145/)