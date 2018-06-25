# Element

## 学习资料

- [DOM Element 阮一峰](https://github.com/ruanyf/jstutorial/blob/gh-pages/dom/element.md)

Element 是一类对象，它们继承了 Element 的属性和方法，还有各自构造函数的属性和方法。如 `<a>` 还继承了 `HTMLAnchorElement`。

## 属性

- `id` 区分大小写
- `tagName` 返回元素的大写标签名，与 `nodeName` 值相等。
- `dir` 当前元素的文字方向，`ltr`表示从左到右，`rtl`是从右到左。
- `accessKey` 用于读写分配给元素的快捷键，按 `alt` + 对应的 `accessKey` 就能将焦点转移到它上面。
- `draggable` 返回一个布尔值，表示元素是否可拖动，可读写。
- `lang` 当前元素的语言设置
- `tabIndex` 当前tab键遍历的顺序，可读写。如果是负数，则不会遍历该元素。如果是正整数，则从小到大遍历。值相等，则按出现的顺序遍历。比如 div 元素默认 tabIndex 为 -1，是不能聚焦的。设为 1 后，通过 tab 或鼠标就可以获得焦点。
- `title` 读写当前元素的 HTML 属性 title。用来指定，鼠标悬浮时弹出的文字提示框。
- `hidden` 可读写，用来控制元素是否可见。它和 css 设置可见性是相互独立的，不能用这个属性判断元素的实际可见性。
- `contentEditable` 可以设置为 true、false、inherit(继承父元素的设置)。
- `isContentEditable` 是否可编辑
- `attributes` 返回一个 NamedNodeMap，它继承自 Attr。返回 html 属性列表。
- `className`
- `classList` 返回一个类似数组的对象，

![](./imgs/classList.png)

    - add()：增加一个或多个 class。
    - remove()：移除一个 class。
    - contains()：检查当前元素是否包含某个 class。
    - toggle()：将某个 class 移入或移出当前元素。第二个参数可以控制添加或删除 class。
    - item()：返回指定索引位置的 class。
    - toString()：将 class 的列表转为字符串。

- `dataset`
- `innerHTML`
- `outerHTML`
- `style`
- `children`
- `clildElementCount`
- `firstElementChild` 没有则返回 null。
- `lastElementChild`
- `nextElementSibling` 没有则返回 null。
- `previousElementSibling`

## 方法

- `getAttribute()` 没有则返回 null。
- `getAttributeNames()` 返回一个数组，成员是当前元素所有属性的名字。Element.attributes 也可以拿到同样的结果，不过是个类数组。
- `setAttribute()`
- `hasAttribute()`
- `hasAttributes()` 表示是否有属性
- `removeAttribute()`
- `querySelector()` 会在全局查找一遍，然后返回第一个
- `querySelectorAll()`
- `getElementsByClassName()`
- `getElementsByTagName()`
- `closest()`
- `matches()`

## 事件相关的方法

- `addEventListener()`
- `removeEventListener()`
- `dispatchEvent()`
- `scrollIntoView()`
- `getBoundingClientRect()`  返回一个对象，包含元素的css盒模型所有信息
- `getClientRects()`
- `insertAdjacentElement()`
- `insertAdjacentHTML()`
- `insertAdjacentText()`
- `remove()`
- `foces()`
- `blur()`
- `click()`
