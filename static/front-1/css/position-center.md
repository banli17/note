# 元素居中

元素居中，是元素在父元素中垂直水平居中。这种布局在工作中经常使用。方法有很多，下面列举一些。

## 负margin

```
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

## flex居中

```
.center{
    display: flex;
    align-items: center;
    justify-content: center;
}
```






















