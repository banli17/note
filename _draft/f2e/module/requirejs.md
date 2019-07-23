---
        title: 无名
        ---
        # requery.js学习笔记

## 学习资料

- [Require.js 叶小钗](https://www.cnblogs.com/yexiaochai/p/3213712.html)
- [RequireJS学习笔记](https://www.cnblogs.com/yexiaochai/p/3214926.html)
- [使用 RequireJS 优化 Web 应用前端](https://www.ibm.com/developerworks/cn/web/1209_shiwei_requirejs/)
- [http://requirejs.org/](http://requirejs.org/)


## 使用

```javascript
<script data-main="script/main.js" scr="scripts/require.js"></script>
```

`main.js`文件的路径是引入require.js的HTML页面目录。

### baseUrl

baseUrl用来设置js加载的相对路径。默认是和`data-main`的值是同一个目录。

```
requirejs.config({
    baseUrl: 'js/lib',  // 也是相对引入require.js的页面的目录
    paths: {
        app: '../app'  // 路径是 js/app，它是相对于baseUrl，不带.js后缀
    }
})
```

### paths

用于定义不在 baseUrl 目录下的模块。

### shim

shim参数解决了使用非AMD方式定义的模块（如jQuery插件）及其载入顺序。比如jquery插件一般是挂载在`jQuery.fn`对象上的，它不是define定义的模块。为了保证在使用插件的时候首先加载jQuery，就需要使用shim。

```javascript
require.config({
    shim: {
        'jquery-slide': ['jquery']
    }
})

require(['jquery-slide'])
```

### require()

```
// 这里jquery,lodash加载是有顺序的
require(['jquery', 'lodash'], function($, _){

})
```

### 循环依赖

有时候，a依赖b，b又依赖a。这时需要用`require('a')`延迟获取模块。否则获取不到a。

```javascript
// a.js
define(['b'], function(b){
    return {
        name: b.name
    }
})

// b.js
define(['a'], function(a){
    // 因为在a里执行依赖b的时候，b.js还没有执行到返回结果，所以出错
    console.log(a)
    return {
        name: a.name
    }
})
```

上面的代码需要修改成下面这样。

```javascript
// a.js
define(['b'], function(b){
    return {
        name: b.name
    }
})

// b.js
define(['a'], function(a){
    return {
        name: function(){
            // 延迟获取a模块，这里return a也没有用，因为a模块之前加载的时候，还没有结果
            return require('a')
        }
    }
})
```

### exports

```javascript
define(function(require, exports, module) {
    //If "a" has used exports, then we have a real
    //object reference here. However, we cannot use
    //any of a's properties until after b returns a value.
    var a = require("a");

    exports.foo = function () {
        return a.bar();
    };
});
```
