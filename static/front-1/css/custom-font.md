## 自定义字体@font-face

@font-face 的语法规则如下：

```
@font-face {
    font-family: <fontFamily>; /* 自定义的字体名称; */
    src: <source> [<format>][,<source> [<format>]]*;  /* 自定义的字体的存放路径、格式; */
    [font-weight: <weight>]; /*  是否为粗体 */ 
    [font-style: <style>]; /*  定义字体样式，如斜体 */
}
```
其取值说明如下：

- fontFamily 此值指的就是你自定义的字体名称，如“font-family: myFirstFont”。

- source 此值指的是你自定义的字体的存放路径，可以是相对路径也可以是绝对路径。

- format 此值表达自定义的字体的格式，用于帮助浏览器识别字体类型。

- weight和style 这两个值大家一定很熟悉，weight 定义字体是否为粗体，style 主要定义字体样式，如斜体。

- https://www.dafont.com/

```
@font-face {
    font-family: Quinzey;
    src: url('./font/Quinzey.otf')
}

div {
    font-family: Quinzey;
    font-size: 30px;
}
```


## 字体格式

- TrueType (.ttf)

Windows 和 Mac 系统最常用的字体格式，其最大的特点就是它是由一种数学模式来进行定义的基于轮廓技术的字体，这使得它们比基于矢量的字体更容易处理，保证了屏幕与打印输出的一致性。同时，这类字体和矢量字体一样可以随意缩放、旋转而不必担心会出现锯齿。

- OpenType (.otf)

OpenType 是一种可缩放字型（scalable font）电脑字体类型，采用 PostScript 格式，是美国微软公司与Adobe 公司联合开发，用来替代 TrueType 字型的新字型。这类字体的文件扩展名为.otf，类型代码是 OTTO。

- Embedded Open Type (.eot)

嵌入字体格式（EOT）是微软开发的一种技术，允许 OpenType 字体嵌入到网页并可以下载至浏览器渲染。这些文件只在当前页活动的状态下，临时安装在用户的系统中。

- Web Open Font Format (.woff)

相对于 TrueType 和 OpenType ，WOFF（Web开发字体格式）是一种专门为了 Web 而设计的字体格式标准，它并不复杂，实际上只是对于 TrueType / OpenType 等字体格式的封装，并针对网络使用加以优化：每个字体文件中含有字体以及针对字体的元数据（ Metadata ），字体文件被压缩，以便于网络传输，并且不包含任何加密或者 DRM 措施。

- Scalable Vector Graphics Fonts (.svg)

顾名思义，就是使用SVG技术来呈现字体，还有一种 gzip 压缩格式的 SVG 字体 .svgz。

这么多字体带来的问题是浏览器的支持：目前现代浏览器基本都支持 .ttf、 .otf、 .woff 的字体格式。但需要注意的是 IE8以下仅支持 .eot 格式，而 .svg 目前只有 safari 支持。

## 如何兼容

通过上面我们可以了解到若在使用 @font-face 规则时仅仅考虑一种字体格式，则可能导致在某些浏览器中无法生效。因此为了兼容不同的浏览器，我们一般会使用多个格式，如下：

```
@font-face {
    font-family: 'myFont';
    src: url('myFont.eot'); /* IE9 Compat Modes */
    src: url('myFont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('myFont.woff') format('woff'), /* Modern Browsers */
}
```

可以设置多个，粗体，细。

## 自定义图标字体 (iconfont)

对于使用图片的图标来说，iconfont 图标有许多优点：

灵活性：改变图标的颜色，背景色，大小都非常简单
兼容性：基本没有兼容性问题，在IE6，Android2.3都能够兼容
扩展性：替换图标很方便，新增图标也非常简单
高效性：iconfont有矢量特性，不会失真
轻便性：在使用上字体文件和普通的静态资源一样，既可以外链也可以内链，并且字体文件也可以使用gzip压缩


## 字体资源与字体图标库

dafont
有字库
GoogleFont（需要翻墙）
字蛛
Fontello
icomoon
iconfont