# 移动端微信H5场景制作有几个问题

- 第一个是页面适配，在不同尺寸下自适应，这个采用rem布局来解决
- 第二个是页面滑动效果的制作，采用swiper.js库 http://www.swiper.com.cn/ 
- 第三个是页面中元素的动画效果，采用animate.css库

下面来大致介绍一下如何制作：

## 轮播库的用法

首先需要引入 swiper.js、swiper.css 文件。
http://www.swiper.com.cn/download/index.html#file5

```markup
<section id="main">  // 用来限制页面最大宽度
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">1</div>
            <div class="swiper-slide">2</div>
        </div>
    </div>
</section>
```

## rem布局

原理：根据移动设备的宽度改变html的fontSize，以至于自动自适应布局。

**样式**
```css
html{
    font-size: 100px;
}
html,body{
    width: 100%;
    height: 100%;
}
```

**javscript**
```javascript
;(function(){
    var desW = 640;  // 设计稿的宽度
    var winW = document.documentElement.clientWidth;
    var rate = winW/desW;
    var main = document.getElementById('main');
    if(winW>desW){
        main.style.width = desW + 'px';
        return; // 限制最大宽度为设计稿的宽度
    }
    document.documentElement.style.fontSize = rate*100 + 'px';
})();
```

## 动画库animate.css的使用

要给页面中元素添加动画，只需要像下面这样就可以了:

```css
.page1.swiper-slide-active .box{
    -webkit-animation: bounceIn 1s;
    animation: bounceIn 1s;
}
```
