new Promise((resolve, reject) => {
    console.log('外部promise');
    resolve();
})
    .then(() => {
        console.log('外部第一个then');
        new Promise((resolve, reject) => {
            console.log('内部promise');
            resolve();
        })
            .then(() => {
                console.log('内部第一个then');
                return Promise.resolve();
            })
            .then(() => {
                console.log('内部第二个then');
            });
    })
    .then(() => {
        console.log('外部第二个then');
    })
    .then(() => {
        console.log('外部第三个then');
    })
    .then(() => {
        console.log('外部第四个then');
    });
