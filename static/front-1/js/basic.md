# js基础

- 引入js脚本
- 注释

## JSDoc注释规范

```
/**
 * @override 对当前代码文件的描述
 * @copyright
 * @author <name> [<emailAddress>] 代码的作者信息
 * @version 当前代码的版本
 */
/**
 * 创建 Hi 实例.
 * @constructor
 * @param {string} name - 姓名.
 * @param {number} age - 年龄.
 * @returns {{name: *, age: *}}
 * @example
 * new Hi('jey', 12)
 */
function Hi(name, age) {
	return {
		name, age
	}
}
```

- http://usejsdoc.org/index.html

变量命名

- 以英文、 _ 或 $ 开始

## 流程控制

- if
- 三元运算符
- switch
- while
- do while
- break  跳出循环
- continue 跳出当前循环，继续下一次循环
- for in 遍历对象

















