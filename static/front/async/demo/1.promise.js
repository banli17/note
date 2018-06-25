var fn = (() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('ok')
        })
    })
})

try {
    var fnRes = fn()
    fnRes
        .catch((e) => {
            console.log('catch')
        })
        .then((d) => {
            console.log('啥', d)
        }, () => {
            console.log('reject')
            // return new Promise((resolve,reject)=>{
            //     reject('xx')
            // })
        })
} catch (e) {
    console.log(e)
}


console.dir(Promise)
