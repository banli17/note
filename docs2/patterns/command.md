---
title: "javascript 命令模式"
sidebar_label: 命令模式
---


命令模式可以降低发起者和执行者的耦合度，还可以进行撤销、排队等操作。

命令模式的关键要素： 发起者，执行者，命令(发起者,执行者.doSomething)。发起者不关心执行者，调用时，直接通过命令层来绑定发起者，来让执行者执行某个操作。

比如点击一个按钮让遮罩隐藏。

```javascript
const mingling = (obj, fn) => obj.onclick = fn
mingling(btn, mask.hide)
mingling(btn, menu.refresh)
```

这种方式将绑定事件的逻辑抽出来了, 看起来要更加精简。

关于撤销操作，是需要记录某对象的原始信息，然后某个操作时，进行还原。通常的做法是定义一个变量，或者在执行者对象上新增一个属性，但是会在很多地方进行记录，恢复。 如果使用命令模式，命令就是这么一个缓存对象。可以在执行某个操作前就绑定原始信息。集中化管理

比如游戏的录制，可以通过命令模式将按键记录保存在对象中，然后对这个对象进行shift()重现。

```html
<html> 
<body>
<button id="replay">播放录像</button> </body>
<script>
var Ryu = {
    attack: function(){ console.log( '攻击' ); },
    defense: function(){ console.log( '防御' ); },
    jump: function(){ console.log( '跳跃' );},
    crouch: function(){ console.log( '蹲下' ); }
}

var makeCommand = function( receiver, state ){
    return function(){
        receiver[ state ]();
    } 
};

var commands = {
    "119": "jump",
    "115": "crouch", 
    "97": "defense", 
    "100": "attack"
 };

var commandStack = [];
document.onkeypress = function( ev ){
    var keyCode = ev.keyCode,
    command = makeCommand( Ryu, commands[ keyCode ] );
    if ( command ){
        command(); // 执行命令 commandStack.push( command );
    } 
};

// 将刚刚执行过的命令保存进堆栈
document.getElementById( 'replay' ).onclick = function(){ // 点击播放录像 var command;
    while( command = commandStack.shift() ){
        command();
    }
};
</script> 
</html>
```

命令队列就是有时候一个任务不能及时完成，我们需要将所有任务进行排队处理。比如动画队列。一个动画结束后该如何通知队列。通常可以使用回调函数来通知队 列，除了回调函数之外，还可以选择发布订阅模式。

宏命令是批量执行命令。

```javascript
const openQQ = ()=>{
    console.log('打开qq')
}

const openChrome = ()=>{
    console.log('打开谷歌浏览器')
}

const openPS = ()=>{
    console.log('打开PS')
}

const command = {
    tasks: [],
    add(command){
        this.tasks.push( command );
    },
    execute(){
        this.tasks.forEach((command)=>{
            command()
        })
    }
}
command.add(openQQ)
command.add(openChrome)
command.add(openPS)

command.execute()
```

一般来说，命令模式都会在 command 对象中保存一个接收者来负责真正执行客户的请求，这种情况下命令对象是“傻瓜式”的，它只负责把客户的请求转交给接收者来执行，这种模式的好处是请求发起者和请求接收者之间尽可能地得到了解耦。

但是我们也可以定义一些更“聪明”的命令对象，“聪明”的命令对象可以直接实现请求， 这样一来就不再需要接收者的存在，这种“聪明”的命令对象也叫作智能命令。



```
document.execCommand('bold')
document.execCommand('undo')
```