var a = {
  name: 'zs',
  age: 22,
  child:{
    name: 'lisi',
    age:1,
    child:{
      name: 'lisi11',
      age:122
    },
  },
  sex: 'man'
}

function clone(target){
  let cloneTarget  = {}
  let arr = [target]
  let carrs = [cloneTarget]
  while(arr.length){
    let o = arr[arr.length-1]
    let x = carrs[carrs.length-1]
     for(let key in o){
       if(typeof o[key] === 'object'){
         arr.push(o[key])
         carrs.push(x[key])
         x[key] = {}
         continue
       }else{
         x[key] = o[key]
         arr.pop()
         carrs.pop()
       }
     }
  }
  return cloneTarget
}

let x = clone(a)

console.log(a)
console.log(x.child === a.child)  //false