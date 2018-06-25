# 迭代器模式

## 简介

迭代就是遍历一个对象的每一项。在js中数组的forEach()方法就是迭代器模式，还有jQuery中的each()方法也是。

我们来简单的模拟一下forEach()方法。

```
const forEach = (arr, fn, t)=>{
    for(let i=0,len=arr.length;i<len;i++){
        fn.call(t, arr[i], i)
    }
}
```

上面叫内部迭代器模式，它的优点是调用简单，不需要关注内部实现，而缺点是迭代模式已经固定，不能修改。

还有一种外迭代器模式，比如es6中的Iterator。它需要手动调用next() 方法才能遍历对象。


迭代类数组和普通对象


倒序迭代器是倒序来遍历对象。

```
const reverseEach = (arr, fn)=> {
	for (let i = arr.length - 1; i >= 0; i--) {
		fn.call(arr, arr[i], i)
	}
}

const a = [1, 5, 'a', 'b']
reverseEach(a, function (item, i) {
	console.log(item, i)
})
```

应用


