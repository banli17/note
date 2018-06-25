# 图片上传

## 简介

图片上传是一个很常见的需求，常见的处理方法有下面几种：
1、传统的表单提交
2、ajax + ReadFile() 将图片转成 base64 格式数据
3、ajax + FormData() 还是通过原始图片格式上传
4、百度 webUploader 图片上传插件 

## 实现

下面就使用代码来说明。

## 传统的表单提交

通过 form input=type 的方法提交。

## ajax + ReadFile()将图片转成 base64 格式数据

## ajax + FormData()

html5 提供了一个 FormData类，它可以将表单数据序列化（包括图片），和ajax联合使用，这样页面就不会跳转，用户体验也很好。这个和传统表单提交时发送的图片格式是一样的。
```markup
<form id="uploadForm">
    <input class="weui-uploader__input" type="file" accept="image/*"
           multiple=""
           name="file"
           @change="uploadImage"
    >
</form>

$.ajax({
    type: 'post',
    url: this.state_api.common.uploadImg,
    data: new FormData(document.getElementById('uploadForm')),
    contentType: false,   // 必须
    processData: false,   // 必须
    async: false,
    cache: false,
    dataType: "json",
    success: function (data) {
        _this.images.push(data.data)
    }
});
```

## 遇到的一些坑

1、使用 thinkphp 做为后台，在移动端上传图片时，提示"文件类型不符合要求"。
这是由于 thinkphp 后端判断图片类型时是判断的文件后缀，而不是根据文件的前几个字节来判断类型的。需要修改。

2、移动端有的手机点击 input type='file'按钮没反应。此问题还没有解决。
