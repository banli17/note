# 布局属性

## position:absolute

`react-native` 支持 `position: absolute` 属性，以及附带的 `top`，`left`, `right`，`bottom`。

## zIndex

当元素添加了 `position:absolute` 后，`zIndex` 可以控制元素显示的层级。

## alignItems

该属性用于设置次轴(默认是水平)方向的排列方式(默认是 `stretch` )。

```markdown
flex-start
flex-end
center
stretch: 要使这个选项生效，子元素在次轴上不能有固定尺寸。
baseline
```

## alignSelf

该属性用于控制单个子元素在垂直于主轴方向的显示，会覆盖父级的 `alignItems` 属性。

```markdown
auto
flex-start
flex-end
center
stretch: 要使这个选项生效，子元素在次轴上不能有固定尺寸。
baseline
```

## aspectRatio


## flexDirection

这个属性用来控制主轴的方向，有2个值可以设置。

```markdown
row ：横向布局
column ：竖向布局，这个是默认布局
```

## justifyContent

这个属性用于设置子元素沿着主轴的排列方式，子元素是在起始端、末端还是均匀分布。

```markdown
flex-start
center
flex-end
space-around:  将空白平均分布
space-between: 首尾元素分布在2端，中间平局分布
```

## flex

flex 是 flex-grow、flex-shrink、flex-basis 的缩写。

- flex-grow 用来控制比例
- flex-shrink 用来控制当父元素小于子元素时，子元素的缩减比

## flexWrap

用来控制元素显示不下的时候时候换行。
