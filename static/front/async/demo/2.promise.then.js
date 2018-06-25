var p = new Promise((resolve, reject) => {
    reject()
})

p.then(null, () => {
    console.log('y')
})

p.catch(e => {
    console.log('gg')
})

// process.on('unhandledRejection', (err, p) => {
//         console.log(err)
//     }
// )

