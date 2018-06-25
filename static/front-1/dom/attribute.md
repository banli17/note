# attribute

## 学习资料

- [dom attribute 阮一峰](https://github.com/ruanyf/jstutorial/blob/gh-pages/dom/attribute.md)

## attribute 和 property 的区别

```
<input id="ipt" type="text" value="12" x="x">
```

html 生成 dom 树的时候，所有公认的 html attribute 会映射到 dom 的 property上。也就是 id、type、value 的值会映射到 dom 下。而不是公认的 attribute `x` 不会映射到 dom 上。所以在控制台打印 `console.dir(ipt)` 时，可以看到节点上并没有 x 属性。而在节点的 attributes (即 html attribute)上有这个属性。

```
ipt.x  // undefined
ipt.getAttribute('x')  // 'x'
```

### 实验1: 公认属性

下面讨论 input 元素的公认属性 value。

```
<input id="ipt" type="text" value="12">

ipt.getAttribute('value')  // 12
ipt.value   // 12

ipt.setAttribute('value', 15)  // 会更新到 dom 树上
ipt.value   // 15

// 不会更新到 html属性上，也会让之后的 setAttribute 不再更新到 dom上
ipt.value = 18    

ipt.getAttribute('value)  // 15
ipt.value   // 18

// setAttribute 更新后，dom不再变化
ipt.setAttribute('value', 20)
ipt.value   // 18
```

setAttribute() 公认属性时会映射到 dom 上。但是一旦设置了 Element.value，它们之间就不会相互影响了。

> input 视图上显示的 value 实际是 dom 的 value，而不是 html attribute 的 value。所以通过 setAttribute 设置后，视图上 input 的值不会变化，除非改变了节点的value属性，视图才会变化。

### 非公认属性

下面讨论 input 元素非公认属性 x。

```
<input id="ipt" x="xx">
```

上面的 html 渲染成 dom 时，非公认 html attributedom 不会映射成 dom 的属性，所以 dom 节点上没有 x 属性。而在 dom 节点的 attribute 下有这个属性。这时 html attribute 和 dom property 互不影响。即 `setAttribute('x')` 不会影响到 `Element.x` 的值。


## Element.attr

使用 Element.attr 获取元素的属性时，有些 js 保留字，必须改名：
- for 属性改成 htmlFor
- class 属性改成 className

```
<label for="label" id="label"></label>

label.for  // undefined
label.htmlFor  // 'label'
label.getAttribute('for') // 'label'
```

通过 Element.attr 获取的元素属性，js 会自动转换类型，比如 onClick 的值转为一个函数， style 属性值转为 CSSStyleDeclaration 对象。 

## 属性操作的标准方法 

- getAttribute() 只返回字符串，属性名大小写不敏感
- setAttribute()
- hasAttribute()
- removeAttribute()

## dataset 属性

非标准的 html 属性在网页代码校验时通不过。最好使用 data-* 属性。 可以通过 dataset 对象获取具体的属性。

```
<div id="mydiv" data-foo="bar">

mydiv.dataset.foo   // 'bar'
mydiv.getAttribute('data-foo') // 'bar'
```

注意，data-后面的属性名有限制，只能包含字母、数字、连词线（-）、点（.）、冒号（:）和下划线（_)。而且，属性名不应该使用A到Z的大写字母，比如不能有data-helloWorld这样的属性名，而要写成data-hello-world。

属性名转为键名时，通过驼峰命名法获取，比如 `data-hello-world` 的值需要通过 `dataset.helloWorld` 获取。
