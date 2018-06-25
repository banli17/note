# navigator

window 对象的 `navigator` 属性，指向一个包含浏览器信息的对象。

## 总览

- navigator.userAgent
- navigator.plugins
- navigator.platform
- navigator.onLine
- navigator.geolocation
- navigator.javaEnabled(), navigator.cookieEnabled
- navigator.connection
- navigator.vendor


## navigator.userAgent

`navigator.userAgent`属性返回浏览器的`User-Agent`字符串，标志浏览器的厂商和版本信息。

通过userAgent属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且无法保证未来的适用性，更何况各种上网设备层出不穷，难以穷尽。所以，现在一般不再识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的JavaScript功能。

不过，通过 `userAgent` 可以大致准确地识别手机浏览器，方法就是测试是否包含`mobi` 字符串。

```
var ua = navigator.userAgent.toLowerCase();

if (/mobi/i.test(ua)) {
  // 手机浏览器
} else {
  // 非手机浏览器
}
```

如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。

```
/mobi|android|touch|mini/i.test(ua)
```

## navigator.plugins

navigator.plugins属性返回一个类似数组的对象，成员是浏览器安装的插件，比如Flash、ActiveX等。

## navigator.platform

`navigator.platform` 属性返回用户的操作系统信息。

```
MacIntel
```

## navigator.onLine

`navigator.onLine` 属性返回一个布尔值，表示用户当前在线还是离线。

## navigator.geolocation

`navigator.geolocation` 返回一个 Geolocation 对象，包含用户地理位置信息。这个对象下面有三个方法：

### getCurrentPosition()
getCurrentPosition() 方法用于获取设备当前位置。

```
navigator.geolocation.getCurrentPosition(success, error, options)
```

经测试，微信里面获取成功但是没数据。其它浏览器正常。

## navigator.javaEnabled(), navigation.cookieEnabled

`javaEnabled` 方法返回一个布尔值，表示浏览器是否能运行`Java Applet`小程序。

`cookieEnabled` 属性返回一个布尔值，表示浏览器是否能储存 `Cookie`。

注意，这个返回值与是否储存某个网站的Cookie无关。用户可以设置某个网站不得储存Cookie，这时cookieEnabled返回的还是true。

## navigator.connection

`navigator.connection` 属性返回一个当前网络状况的 NetworkInformation对象。这是一个实验中的功能。

```
{
    downlink: 2.35,
    effectiveType: '4g',
    onchange: null,
    rtt: 400
}
```

## navigator.vendor 

navigator.vendor 返回浏览器公司信息
