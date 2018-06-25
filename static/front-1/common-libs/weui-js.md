# weui.js使用文档

资料：[https://github.com/Tencent/weui.js](https://github.com/Tencent/weui.js)

## actionSheet(menus, actions, [options])

弹出式菜单

| 参数| 类型| 描述 |
| --- | --- | --- |
| menus | `array` | 上层的选项 |
| menus[].label | `string` | 选项的文字 |
| menus[].onClick | `function` | 选项点击时的回调 |
| actions | `array` | 下层的选项 |
| actions[].label | `string` | 选项的文字 |
| actions[].onClick | `function` | 选项点击时的回调 |
| [options] | `object` | 配置项 |
| [options.className] | `string` | 自定义类名 |
| [options.onClose] | `function` | actionSheet关闭后的回调 |

**Example**  
```js
weui.actionSheet([
    {
        label: '拍照',
        onClick: function () {
            console.log('拍照');
        }
    }, {
        label: '从相册选择',
        onClick: function () {
            console.log('从相册选择');
        }
    }, {
        label: '其他',
        onClick: function () {
            console.log('其他');
        }
    }
], [
    {
        label: '取消',
        onClick: function () {
            console.log('取消');
        }
    }
], {
    className: 'custom-classname',
    onClose: function(){
        console.log('关闭');
    }
});
```


## alert
## confirm
## dialog
## form
## gallery
## loading
## picker
## searchBar
## slider
## tab
## toast
## topTips
## uploader