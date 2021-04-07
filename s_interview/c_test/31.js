for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000)
}
for (var i = 0; i < 10; i++) {
    (function (i) {
        setTimeout(() => {
            console.log(i);
        }, 1000)
    })(i)
}
for (var i = 0; i < 10; i++) {
    setTimeout((i) => {
        console.log(i);
    }, 1000, i)
}