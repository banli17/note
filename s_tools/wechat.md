---
title: 微信开发
sidebar_label: 微信开发
---

## 问题

### 头像模糊

获取用户的头像模糊，需要将 avatarUrl 地址后面的 132 更换成 0，图片就变大变清晰了。

```
# http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqU5CIYibTzMpIneZdcEWWSN99sdh9zpUpoGXFqrkyGqNmyWlW9ibiaB0yeKHCRxicicmOfYkpcFExbSGA/132

src = src.replace(/\/\d+?$/, '/0')
```

## 小程序

### 修改 item、key 变量名

```
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>
```

### 3d 轮播图

![](imgs/2020-09-16-11-54-36.png)

```jsx title="wxml结构"
<view class="swiper_wrapper">
  <swiper
    class="swiper"
    indicator-dots="{{swiper.indicatorDots}}"
    indicator-active-color="#e93323"
    autoplay="{{swiper.autoplay}}"
    circular="{{swiper.circular}}"
    previous-margin="30px"
    next-margin="30px"
    interval="{{swiper.interval}}"
    duration="{{swiper.duration}}"
    bindchange="swiperChange"
  >
    <swiper-item class="swiper_item" wx:for="{{swiperList}}" wx:key="{{index}}">
      <image
        src="{{item.img}}"
        mode="aspectFill"
        class="slide-image {{index === swiperIndex ? 'on': ''}}"
      />
    </swiper-item>
  </swiper>
</view>
```

```less title="less样式"
.swiper_wrapper {
  padding: 30rpx 0;
}

.slide-image {
  width: 100%;
  height: 100%;
  display: block;
  transform: scale(0.9);
  transition: all 0.3s ease;
  border-radius: 6px;
  &.on {
    transform: scale(1);
  }
}
```

```js title="js文件"
Page({
  data: {
    swiper: {
      indicatorDots: true,
      circular: true,
      autoplay: false,
      interval: 3000,
      duration: 500,
    },
    swiperIndex: 0,
    swiperList: [
      { img: "https://www.banli17.com/img/undraw_docusaurus_mountain.svg" },
      { img: "https://www.banli17.com/img/undraw_docusaurus_mountain.svg" },
      { img: "https://www.banli17.com/img/undraw_docusaurus_mountain.svg" },
    ],
  },
  swiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current,
    });
  },
});
```
