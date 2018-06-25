# zepto ajax源码

## 简介
zepto ajax.js源码里，一共有20多个方法，分为私有方法和挂在$对象上的方法。

**私有方法**

- triggerAndReturn()
- triggerGlobal()
- ajaxStart()
- ajaxStop()
- ajaxBeforeSend()
- ajaxSuccess()
- ajaxError()
- ajaxComplete()
- ajaxDataFilter()
- empty()
- mimeToDataType()
- appendQuery()
- serializeData()
- parseArguments()
- serialize()

**$下的属性和方法**

- $.active
- $.ajaxSettings：全局和默认的ajax配置，调用$.ajax时，传的参数会覆盖全局
- $.ajaxJSONP()
- $.ajax()：实现ajax的主要方法
- $.get()：实际调用的$.ajax()方法
- $.post()：实际调用的$.ajax()方法
- $.getJSON()：实际调用的$.ajax()方法
- $.fn.load()
- $.param



