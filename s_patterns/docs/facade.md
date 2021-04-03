---
title: "javascript 外观模式"
sidebar_label: 外观模式
---



外观模式(Facade)也叫做门面模式，它是为子系统（一组类的集合，这些类可以相互协助组成系统中一个相对独立的部分）中的一组接口提供一个统一的高层接口，使得子系统更容易使用。

比如启动电脑的时候。我们不关心CPU，内存，硬盘的启动和加载，只需要按一个启动键就可以了。

```javascript
class CPU{
    freeze(){}
    jump(){}
    execute(){}
}
class Memory{
    load(){}
}
class HardDrive{
    read(){}
}

// Facade 门面
class Computer{
    start(){
        cpu.freeze()
        memory.load()
        cpu.jump()
        cpu.execute()
    }
}

let c = new Computer()
c.start()
```

可以看到外观模式屏蔽了客户操作子系统的复杂性，提供了一个简单的高层接口。请求外观不是强制的，也可以绕过外观直接操作子系统。

场景

1、比如将阻止事件冒泡和默认事件封装在一起。

```javascript
var stopEvent = function( e ){   //同时阻止事件默认行为和冒泡
    e.stopPropagation();
    e.preventDefault();
}
```

2、比如传几种参数。

```javascript
function bindEvent(elem, type, selector, fn){
    if(fn == null){
        fn = selector
        selector = null
    }
}

// 调用
bindEvent(elem, 'click', '#div1', fn)
bindEvent(elem, 'click', fn)
```

3. 设置css

```javascript
function setStyles( id, styles ){
    var element = document.getElementById( id );
    for( var key in styles ){
        if( styles.hasOwnProperty( key ) ){
            element.style[ key ] = styles[ key ];
        }
    }
}

setStyles( 'content', {
    color : 'red'，
    height : '200px'
} ); 
```

如果要批量操作元素，还可以再次包装。

```javascript
function setCSS( ids, styles ){
    for( var i = 0,len = ids.length; i<len; i++ ){
         setStyles( ids[i], styles );
    }
} 
```

总结

- 不符合单一职责原则和开发封闭原则，胖接口。因此谨慎使用，不可滥用。
- 符合最少知识原则。
- 子系统的内部变化了，只要外观不变就不会对客户造成影响。
- 外观模式是封装的子系统，而普通的封装是都可以封装。
