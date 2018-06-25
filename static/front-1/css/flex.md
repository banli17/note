# flex布局

flex布局刚开始学习的时候会感觉比较复杂，因为网上介绍它的很多文章都比较长。但是其实静下心来学习一遍后，会发现它很简单。

当给一个盒子设置了 `display: flex` 属性后，它的子元素就形成了 flex 布局模型。

关于父盒子有如下属性

- flex-direction
- flex-wrap
- flex-flow: 上面2个属性的缩写
- justify-content
- align-items
- align-content

下面是子盒子的属性：

- flex-grow: 父盒子空间有富余时，子元素怎么占用
- flex-shrink: 子盒子空间超出父盒子空间时，子元素怎么收缩
- flex-basis: 在主轴上的长度，会覆盖width或height属性
- flex: 上面3个属性的缩写,默认是 0 1 auto。auto (1 1 auto) 和 none (0 0 auto)。
- align-self: 子盒子自身在副轴上的分布，覆盖align-items
- order