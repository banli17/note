---
title: css常用代码
date: 2016-08-14 19:19:33
toc: true
---


## 元素居中方案

元素居中，是元素在父元素中垂直水平居中。这种布局在工作中经常使用。方法有很多，下面列举一些。

### 负 margin

```css
.center{
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
```

### flex居中

```css
.center{
    display: flex;
    align-items: center;
    justify-content: center;
}
```




## 光泽闪过的效果

1.jpg

```css
@-webkit-keyframes light {
    100% { opacity: 1; left: 125%; }
}
@-moz-keyframes light {
    100% { opacity: 1; left: 125%; }
}
@-ms-keyframes light {
    100% { opacity: 1; left: 125%; }
}
@keyframes light {
    100% { opacity: 1; left: 125%; }
}
@-webkit-keyframes light2 {
    100% { opacity: 1; left: -150px; }
}
@-moz-keyframes light2 {
    100% { opacity: 1; left: -150px; }
}
@-ms-keyframes light2 {
    100% { opacity: 1; left: -150px; }
}
@keyframes light2 {
    100% { opacity: 1; left: -150px; }
}
 a::before, a::after {
    opacity: 0;
    content: "";
    width: 80px;
    height: 100%;
    overflow: hidden;
    transform: skewX(-25deg);
    position: absolute;
    top: 0;
    left: -150px;
    background: -moz-linear-gradient(left, rgba(255, 255, 255, 0) 0px, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
    background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0px, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0px, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%);
}

a:hover::before, a:hover::after {
    -webkit-animation: light 1s ease-out;
    -moz-animation: light 1s ease-out;
    -ms-animation: light 1s ease-out;
    animation: light 1s ease-out;
}
```

如果是小图片，只要从左到右的，则只需要写`light1，a::before`就行。