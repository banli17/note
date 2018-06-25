# 瀑布流
https://github.com/zhufengketang/app
## 算法

假定有2个互不想关的过程：

1. 加载
    1. 有一个单独的方法 Append([]) 导入数据
    2. 将滚动替换过程锁定(因为部分卡片高度未知)
    3. 将新卡片 append 到底部
    4. 新卡片渲染完成后解锁滚动替换方法，并执行一次
    
2. 滚动替换

已知所有卡片的高度（假设卡片高度不一致），求解哪些卡片应该隐藏，哪些卡片应该显示，根据所有卡片的高度数组 itemHeights[]，屏幕高 H，默认加载卡片数 S，滚动距离 y 计算 （p,q,H1,h3）
    - p: 开始的卡片，第一个 top 大于 （y - H）的卡片
    - q: 结束的卡片 （q = p + s）
    - H1: 顶部替换盒子的高度 top(p)
    - h3: 底部替换盒子的高度 sum(q+1, N)

## ScrollView的方法

```
onScroll: 滚动时触发
scrollEventThrottle: 触发频率，毫秒数

// event对象的属性
event.nativeEvent.contentOffset.y : 滚动距离
event.nativeEvent.contentSize.height : 内容的高度

```