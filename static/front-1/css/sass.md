

## 嵌套

## 变量

$blue: #188eee;

```
@mixin box-shadow($shadow...){
    -moz-box-shadow: $shadow;
    -webkit-box-shadow: $shadow;
    box-shadow: $shadow;
}
.box{
    @include box-shadow(2px 2px #ccc)
}
```

```
@for $i from 1 to 4 {
    .item-#{$i} {
        
    }
}
```