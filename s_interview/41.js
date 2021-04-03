var a = 10;
(function () {
    console.log(a)  // undefined
    a = 5     
    console.log(window.a)  // 10
    var a = 20;
    console.log(a)   // 20
})()