# thinkcmf 常用标签

## 文档
- http://www.thinkcmf.com/document/article/id/350.html 
- [thinkcmf5](https://www.kancloud.cn/thinkcmf/theme_tutorial/495140)

## 所有变量列表

```markup
<php>dump(get_defined_vars());</php>
```


## 获取轮播图

```html
// thinkcmf5
<ul id="home-slider" class="list-unstyled">
    <slides id="1">
        <li>
            <div class="caption-wraper">
                <div class="caption">{$vo.title|default=''}</div>
            </div>
            <a href=""><img src="/upload/{$vo.image}" alt=""></a>
        </li>
    </slides>
</ul>



// old
<php>
$home_slides=sp_getslide("portal_index");
$home_slides=empty($home_slides)?$default_home_slides:$home_slides;
</php>
<ul id="homeslider" class="unstyled">
    <foreach name="home_slides" item="vo">
    <li>
        <div class="caption-wraper">
            <div class="caption">{$vo.slide_name}</div>
        </div>
        <a href="{$vo.slide_url}"><img src="{:sp_get_asset_upload_path($vo['slide_pic'])}" alt=""></a>
    </li>
    </foreach>
</ul>
```

## 列表、文章链接href

```markup
<a href="{:U('list/index', array('id'=>19))}" class="jui-btn">查看更多&gt;</a>  // 原始分类地址的链接
<a href="{:leuu('list/index', array('id'=>19))}" class="jui-btn">查看更多&gt;</a>  // url美化后，分类的链接
```

## 文章列表

```php
<php>
    $news=sp_sql_posts('cid:19;field:post_title,post_content;order:listorder asc');
</php>
<ul class="news-list">
    <foreach name="news" item="vo">
        <li>
            <a href="{:leuu('article/index',array('id'=>$vo['object_id'],'cid'=>$vo['term_id']))}">
            {$vo.post_title }...
            </a>
            <span class="time">{$vo.post_date }<span>
        </li>
    </foreach>
</ul>
```

## 文章信息

```markup
$posts=sp_sql_post($article,'field:post_title,post_content;');
```

## 分类信息
```markup
<?php
    $term=sp_get_term($term_id );
?>
<div class="banner-mainTitle">{$term.name }</div>  // 分类名称
<div class="banner-subTitle">{$term.description}</div>  // 获取分类描述
```

## title相关标签

```markup
{$site_name}  网站名称

// 全站seo
{$site_seo_title}               <!--SEO标题-->
{$site_seo_keywords}            <!--SEO关键字-->
{$site_seo_description}         <!--SEO描述-->

// 分类页面
{$seo_title}                     <!--SEO标题-->
{$seo_keywords}                  <!--SEO关键字-->
{$seo_description}               <!--SEO描述-->

// 文章页面
{$post_title}    <!-- 文章标题-->
{$post_keywords} <!--关键字-->
{$post_excerpt}  <!-- 文章摘要-->

// 页面
{$post_title}    <!-- 文章标题-->
{$post_keywords} <!--关键字-->
{$post_excerpt}  <!-- 文章摘要-->
```
