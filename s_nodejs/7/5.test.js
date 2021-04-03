// 1) 
const p =Promise.resolve();
;(()=>{
    const implicit_promise = new Promise(resolve =>{
        // 此函数会立即执行
        // 一个promise resolve另一个promise，会形成一个then().then
        const promise = new Promise(res=>res(p)); 
        promise.then(()=>{ // 这个promise 又多了then了一次 
            console.log('after:await');
            resolve()
        })
    });
    return implicit_promise
})();
// 微任务的顺序
p.then(()=>{ // 默认这个promise是成功 所有执行成功的方法
    console.log('tick:a');
    return undefined
}).then(()=>{ // 马上继续then 但是这个then不会立即执行
    console.log('tick:b');
}).then(()=>{
    console.log('tick:c');
});
//  a b await c
//  a b c await

// 2)  在老的node中   await 会被解析出两个then  以前的时候 会解析出一个then方法
async function async1() {
    console.log('async1 start');
     await async2();
     console.log('async1 end')
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end');
// script start ,async1 start, async2, promise1,script end,   
// setTimeout
  
  
