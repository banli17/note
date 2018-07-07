# 事件和事件对象

## 事件

js 和 html 的交互是通过事件来实现的，用户对页面进行操作，然后执行事件函数。事件名有如：click、hover等。事件绑定函数名是在事件名前面加`on`。

```javascript
div.onclick = function(){}
```

## 事件流

点击某个元素时，实际上也点击了其外层元素、body和document等元素。事件流就是事件传播的方向。

```html
<html>
    <head></head>
    <body>
        <div></div>
    </body>
</html>
```

dom2级事件规范规定，事件流有3个阶段。拿点击 div 元素为例，事件传播过程如下。

1. 事件捕获流：即从外层元素往里传播，到达目标元素之前。`document -> html -> body`。
2. 到达目标元素：div。
3. 事件冒泡流：即从 div 离开之后，`body -> html -> document`。

另外还规定，从捕获到目标元素阶段，不触发事件处理函数。

但是各浏览器的实现和规范有一些差异。差异如下：

1. 在目标元素，不管是从捕获来还是冒泡离开，都会触发事件处理函数。
2. 标准规定最上层传播到document，但是 ie9 和 chrome 等浏览器会一直传播到 window。
3. ie8及之前版本只支持事件冒泡流。
4. ie5.5及之前版本冒泡时会跳过 html，从 body 直接到 document。

## 事件处理函数

给元素添加事件绑定函数的方法有3种。

**1、直接在 html 元素上绑定。**

```html
<div onclick="alert(1)" ></div>
```

这种方式绑定的方法里，直接就可以使用this、event这些变量。另外如果是处于form里的input元素，直接可以使用变量。

```html
<form>
    <input name="name" onfocus="console.log(name)">
</form>
```

**2、dom0级事件绑定**

dom0级事件绑定就是通过`on+事件名 = 事件处理函数`的方式。

```javascript
div.onclick = function(){}

// 移除事件处理函数
div.onclick = null
```

**3、dom2级事件绑定**

dom2级事件绑定是通过`addEventListener()`方法进行绑定。

```javascript
div.addEventListener('click', function(){}, false)
```

第一个参数是事件名。第二个参数是事件处理函数，第三个是true表示事件处理函数在捕获阶段触发，false表示在冒泡阶段触发。

通过这种方式绑定的事件处理函数可以通过`removeEventListener()`进行移除。注意第二个参数要是同一个函数才行。

```javascript
// error
div.addEventListener('click', function(){}, false)
div.removeEventListener('click', function(){}, false)

// right
div.addEventListener('click', handler, false)
div.removeEventListener('click', handler, false)
```

上面移除的匿名函数实际不是同一个函数。

dom2级和dom0级事件绑定的主要区别是：dom0级多个事件处理函数后者会覆盖前者，dom2级可以有多个，触发顺序是绑定的先后顺序。

**4、ie事件绑定**

ie8及之前版本只有冒泡，它提供了`attachEvent`和`detachEvent`。

```javascript
div.attachEvent('onclick', function(){
    console.log(this === window)  // true
})
```

ie绑定事件和`addEventListener()`的区别是：

1. 只有冒泡
2. 第一个参数是`on`+事件名
3. attachEvent 事件绑定函数里的 this 是 window，而 addEventListener 里的是当前元素。
4. 事件处理函数触发顺序不同，attachEvent 是倒序，而 addEventListener 是正序。


**5、兼容性处理**

```javascript
function bindEvent(el, ename, handler){
    if(el.addEventListener){
        el.addEventListener(ename, handler, false)
    }else if(el.attachEvent){
        el.attachEvent('on' + ename, handler)
    }else{
        el['on'+ename] = handler
    }
}

function removeEvent(el, ename, handler){
    if(el.removeEventListener){
        el.removeEventListener(ename, handler, false)
    }else if(el.detachEvent){
        el.detachEvent('on' + ename, handler)
    }else{
        el['on'+ename] = null
    }
}
```

上面的兼容处理只是很简单的处理了一下，没有处理一些如 attachEvent this 的问题。不过现在 ie8 基本都淘汰了，没什么大问题。

## 事件对象

各浏览器都支持事件对象，只是方式不同。

### DOM中的事件对象

事件对象包含事件的相关信息。比如点击鼠标时，鼠标在屏幕的位置，事件名等等。标准的事件对象是通过事件处理函数第一个参数自动传递的。

```html
<div onclick="alert(event)"></div>

div.onclick = function(event){}

div.addEventListener('click', function(event){
    console.log(event)
}, false)
```

**取消事件默认行为**

事件默认行为是指一些元素会有默认的事件行为，比如点击 a 链接时，默认会跳转到其 href 属性的链接。取消的方法是通过`event.preventDefault()`。

```javascript
div.onclick = function(event){
    event.preventDefault();
}

div.addEventListener('click', function(event){
    event.preventDefault();   // 加上这句
}, false)
```

不过前提是这个默认行为能取消掉，可以通过`event.cancelable`来判断。

**事件对象常用的属性：**
- bubbles：表明事件是否冒泡
- cancelable：事件是否可以被取消
- currentTarget：当前绑定处理程序的元素
- target：事件发生的目标
- defaultPrevented：true表示已经调用了`event.preventDefault()`
- detail：事件细节信息
- eventPhase：调用事件程序的阶段，1表示捕获，2表示处于目标，3表示冒泡
- preventDefault()：取消事件默认行为
- stopImmediatePropagation()：取消事件捕获和冒泡，同时阻止后面绑定自身上处理程序的调用
- stopPropagation()：取消事件捕获和冒泡
- trusted：true表示浏览器触发的事件，false表示开发者创建的
- type：通过type可以用判断类型，一个处理函数处理多个事件类型。
- view：与事件关联的抽象视图，等同于发生事件的window对象

**this、currentTarget、target关系**

this、currentTarget是绑定的元素，target是实际触发的元素。

```javascript
// 点击div元素
// 处理函数绑定在div本身上
div.onclick = function(){
    // this == currentTarget == target
}

// 处理函数绑定在父级body上
body.onclick = function(){
    // this == currentTarget == body
    // target == div
}
```

### IE中的事件对象

ie 中 DOM0 级添加事件处理程序时，event 对象是 window 的属性。

```javascript
// 只是通过window.event
div.onclick = function(){
    var event = window.event
    console.log(event.type)  // 'click'
}

// window.event和参数event都可以
div.attachEvent('onclick', function(event){
    console.log(event.type)  // 'click'
    console.log(window.event.type)  // 'click'
})

// 通过event
<input type="button" value="click" onclick="console.log(event.type)"
```

**ie事件对象的属性**

- cancelBubble：默认是false，如果是true则取消冒泡，
- returnValue：默认是true，如果是false则取消默认行为
- srcElement：事件的目标，和 target 一样。
- type：事件类型

注意：attachEvent事件处理程序里的this是window，所以使用`event.srcElement`获取元素，而不要使用this。

## 跨浏览器事件对象

```javascript
var EventUtil = {
    addHandler: function(){},
    removeHandler: function(){},
    getEvent: function(event){
        return event ? event : window.event
    },
    getTarget: function(event){
        return event.target || event.srcElement
    },
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault()
        }else{
            event.cancelBubble = true
        }
    },
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation()
        }else{
            event.returnValue = false
        }
    }
}
```

注意ie不支持事件捕获，所以上面方法只能阻止事件冒泡。

## 事件类型









