const myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];


const a = myFish.splice(1, 0)  // 没有删除元素


console.log(a)   // []


const b = myFish.splice(1, 0, 'hello', 'hi')  // 从start新增元素
console.log(myFish) // [ 'angel', 'hello', 'hi', 'clown', 'mandarin', 'sturgeon']

myFish.splice(1, 1)  // 删除第1项

console.log(myFish)  // [ 'angel', 'hi', 'clown', 'mandarin', 'sturgeon' ]
