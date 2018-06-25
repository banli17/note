# Date日期


## 常用函数

**1.获取某个日期加减多少天后的日期**

```
function getNewDate(date, changeDay){
    var t = new Date(date)
    return new Date(t.getFullYear(), t.getMonth(), t.getDate()+ changeDay)
}
```

使用 `new Date(2011, 1, 10)` 表示 `2011-2-10`。直接加减日期 10 就可以获取正确的时间。

**获取几月的第几周日期区间**

```
function getWeek(year, month, week){
    week = week || 0
    var d = new Date();
    d.setFullYear(year, month - 1, 1);
    var w1 = d.getDay();
    if (w1 == 0) w1 = 7;
    d.setFullYear(year, month, 0);
    var dd = d.getDate();
    if (w1 != 1) d1 = 7 - w1 + 2;
    else d1 = 1;
    week_count = Math.ceil((dd - d1 + 1) / 7);
    // console.log(year + "年" + month + "月有" + week_count +"周");
    var arr = []
    for (var i = 0; i < week_count; i++) {
        var monday = d1 + i * 7;
        var sunday = monday + 6;
        var from = year + "-" + month + "-" + monday;
        var to;
        if (sunday <= dd) {
            to = year + "-" + month + "-" + sunday;
        } else {
            d.setFullYear(year, month - 1, sunday);
            to = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        }
        arr.push({
            index: i + 1,
            from: from,
            to: to
        })
        // console.log("第"+(i+1)+"周 从" + from + " 到 " + to + "");
    }
    return {
        arr: arr,
        w: arr[week - 1],
        week_count: week_count
    }
}
```