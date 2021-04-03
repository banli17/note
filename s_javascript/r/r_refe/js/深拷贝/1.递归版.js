// var a = new Set([1,2,3])
// var a = function(){ console.log(1) }

var a={b:1,c:{}};  
a.d=a;  
a.c.e=a.c  

// var b = JSON.parse(JSON.stringify(a))

// 缺点
// 1. 不能拷贝其它引用类型，如 set
// 2. 拷贝函数会报错
// 3. 循环引用，循环引用是因为遇到引用就去拷贝，结果就爆栈了，所以只要是之前拷贝过的，使用引用即可。
// console.log(toString.call (b)) //{}

function clone(target, map = new WeakMap()){
  if(typeof target === 'object'){
    const isArray = Array.isArray(target) 
    let cloneTarget = isArray ? [] : {}
    if(map.get(target)){
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for(let key in target){
      cloneTarget[key] = clone(target[key], map)
    }
    return cloneTarget
  }else{
    return target
  }
}
console.log(clone(a))