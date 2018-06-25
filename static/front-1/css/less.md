# less概览

## 注释

```markup
/* 我是被编译的，会保留 */
// 不会被保留
```

## 变量

```less
@color-default: red;

.box{
    color: @color-default;
}
```

## 混合

```less
// 混合
.border{
    border: 1px solid red;
}
.box{
    color: @color-default;
    .border;
}

// 混合 - 可带参数
.border_02(@border_width){
    border: solid yellow @border_width;
}

.test{
    .border_02(30px);
}

// 混合 - 默认带值
.border_03(@border_width:10px){
    border: solid yellow @border_width;
}

.text{
    .border_03();
}

// 混合的例子
.border_radius(@radius: 5px){
    -webkit-border-radius: @radius;
    -ms-border-radius: @radius;
    border-radius: @radius;
}
```

## 匹配模式

```less
// 普通
.sanjiao{
    width: 0;
    height: 0;
    overflow: hidden;
    
    border-width: 10px;
    border-color: red transparent transparent transparent; // 朝下
    border-style: solid; // ie不兼容，需要改成 solid dashed dashed dashed
}

// 匹配模式
.triangle(top, @w:5px, @c:#ccc){
    border-width: @w;
    border-color: transparent transparent @c transparent;
    border-style: dashed dashed solid dashed;
}
.triangle(bottom, @w:5px, @c:#ccc){
    border-width: @w;
    border-color: @c transparent transparent transparent;
    border-style: solid dashed dashed dashed;
}
.triangle(@_, @w:5px, @c:#ccc){
    // 默认带上这个
    width: 0;
    height:0;
    overflow: hidden;
}
.sanjiao{
    .triangle(bottom,100px);
}

// 匹配模式 - 定位
.pos(r){
    position: relative;
}
.pos(f){
    position: fixed;
}
.pos(a){
    position: absolute;
}
.pipe{
    .pos(f);
}
```

## 运算

```less
@test: 100px;
.box{
    width: @test -10*2
}
```

## 嵌套规则

```less
.list {
    ul{
        li{
            a{
                color: red;
            }
        }
    }
}

// & 表示上一层选择器
a{
    &:hover{  // 表示 a:hover
        color: red;
    }
}

// .title
//.title_nav 可以写成 &_nav
```
## arguments

```less
.border(@w:20px,@c:red,@type:solid){
    border: @arguments;
}
```

## 避免编译

```less
.test{
    width: ~'calc(300px -10px)';
    // calc 是浏览器计算的，而不是css
}
```

## important

```less
.test{
    .border()!important;  // 里面所有的元素都会加 !important
}
```

































































































































































































































