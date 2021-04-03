// window.onerror
// window.onerror = function (message, source, lineno, colno, error) {
//     console.log("message:", message)
//     console.log("source:", source)
//     console.log("lineno:", lineno)
//     console.log("colno:", colno)
//     console.log("error:", error)
//     return true
// }

// window.addEventListener('error', e => {
//     console.log('ee', e)
// }, true)



// 页面崩溃

window.addEventListener('load', function () {
    sessionStorage.setItem('good_exit', 'pending');
    setInterval(function () {
        sessionStorage.setItem('time_before_crash', new Date().toString());
    }, 1000);
});

window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('good_exit', 'true');
});

if (sessionStorage.getItem('good_exit') &&
    sessionStorage.getItem('good_exit') !== 'true') {
    /*
       insert crash logging code here
   */
    alert('Hey, welcome back from your crash, looks like you crashed on: ' + sessionStorage.getItem('time_before_crash'));
}


window.onunload = function () {
    return confirm("确定离开此页面？")
}
window.addEventListener('beforeunload', function () {
    return 'xx'
}, true)