# 选择器实现

对象转换

原生转 jQuery 对象: 将原生转为数组 [DOM 节点]，然后通过 merge 合并到 jQuery 对象上。
jQuery length 的作用: 让 dom 数组平滑过度到 jQuery 对象上
merge 场景: 将数组合并 或将数组合并到有 length 属性的对象上
$(document).ready() 与 $(function(){}) 的关系

## 接口

```
// 传入对象
$(this) $(document)

// 传入函数
$(function(){})

// 传入字符串，选择 DOM 节点
$('.box')

// 传入 HTML 字符串，创建 DOM 节点
$('<div>')

// 创建 jQuery 对象
$()
```
