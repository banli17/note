---
title: 常用代码
sidebar_label: 常用代码
---

## CSS

### 滚动条样式

```css
::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar {
  width: 10px; /*对垂直流动条有效*/
  height: 10px; /*对水平流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rosybrown;
  border-radius: 3px;
}

/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #e8e8e8;
}

/*定义两端按钮的样式*/
::-webkit-scrollbar-button {
  background-color: cyan;
}

/*定义右下角汇合处的样式*/
::-webkit-scrollbar-corner {
  background: khaki;
}
```

### input 的 placeholder 的字体样式

```css
input::-webkit-input-placeholder {
  color: red; /* Chrome/Opera/Safari */
}
input::-moz-placeholder {
  color: red; /* Firefox 19+ */
}
input:-ms-input-placeholder {
  color: red; /* IE 10+ */
}
input:-moz-placeholder {
  color: red; /* Firefox 18- */
}
```

### 文字超出省略号

```
.one_line{
    width:200rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.two_line{
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

### 文字自动换行

```
word-wrap: break-word;
word-break：break-all;
```

### 表格边框

```css
table,
tr,
td {
  border: 1px solid #333;
}
table {
  border-collapse: collapse;
}
```

## JavaScript

### 解析 excel

- [SheetJS js-xlsx](https://github.com/SheetJS/sheetjs)

```html
<script src="https://raw.githubusercontent.com/SheetJS/sheetjs/master/dist/xlsx.full.min.js"></script>
<input type="file" id="excel-file" />
<script>
  function parseExcel(file) {
    var fileReader = new FileReader();
    fileReader.onload = function (ev) {
      try {
        var data = ev.target.result;
        var workbook = XLSX.read(data, {
          type: "binary",
        }); // 以二进制流方式读取得到整份excel表格对象
        var persons = []; // 存储获取到的数据
      } catch (e) {
        return console.log("文件类型不正确");
      }
      // 表格的表格范围，可用于判断表头是否数量是否正确
      var fromTo = "";
      // 遍历每张表读取
      var result = {};
      const formData = [];
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1,
        });
        if (roa.length) result[sheetName] = roa;
        const r = result[sheetName];
        console.log(r);
        const subFormData = {};
        try {
          subFormData.title = r[0][0].trim();
          subFormData.time = r[1][0].trim();
        } catch (e) {
          console.log("error", e);
        }
        subFormData.list = [];
        r.slice(3).map((item) => {
          const len = item.length;
          subFormData.list.push([
            item[0] ? String(item[0]).trim() : "",
            item[len - 2] ? String(item[len - 2]).trim() : "",
            item[len - 1] ? String(item[len - 1]).trim() : "",
          ]);
        });
        formData.push(subFormData);
      });
      console.log(formData[0]);
    };
    fileReader.readAsBinaryString(file);
  }
  $("#excel-file").change(function (e) {
    parseExcel(e.target.files[0]);
  });
</script>
```
