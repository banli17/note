# 瀑布流

## 简介

## 实现原理
如果每一个元素的高度一致，那么只需要使用 `float` 或者 `flex` 从上往下排列即可。

如果元素的高度不一致，则思路如下：
1. 规定瀑布流的列数为 n。
2. 遍历元素，将元素插入到高度最低的那一列。

## 具体实现例子

### vue实现瀑布流

使用 vue.js 实现瀑布流十分简单，思路如下：
1. 首先规定瀑布流分成 n 列。
1. 根据 n 列生成 lists：[[第1列的数据],[第2列的数据],[...]] 。
1. 请求数据，循环数据，并将每一个数据添加到 lists 的高度最低的那一列中。

简要代码如下：

```html
// html结构
<div class="waterfall">
    <div class="cols" v-for="list in lists">
        <div v-for="l in list"></div>
    </div>
</div>

// 样式
<style>
.waterfall{
    display: flex;
}
.waterfall .cols{
    flex: 1;
}
</style>

// js
<script>
new Vue({
    data(){
        return {
            cols: 3,           // 瀑布流的列数
            dataList: [],      // 瀑布流总数据
            lists: [[],[],[]], // 根据cols动态生成
        }
    }  
})
</script>
```

