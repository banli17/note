// var a = new Set([1,2,3])
// var a = function(){ console.log(1) }

// var a={b:1,c:{}, fn:function(){}};  

var a = Symbol('hi')

function isObject(obj){
  return  typeof obj === 'object' && obj !== null
}

function clone(target, map = new WeakMap()){

  if(!isObject(target)){
    return target
  }

  if(typeof target === 'object' &&  target !== null){
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
  }
 
}
let c = clone(a)
console.log(c, c == a)
// console.log(c.fn === a.fn) // true

