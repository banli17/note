; (async () => {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('promise');
            resolve()
        })
    })
    console.log('ggg')
})();

console.log('xxx')