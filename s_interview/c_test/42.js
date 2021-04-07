async function sleep(time) {
    let now = Date.now()
    while (Date.now() - now < time) {}
}

sleep(1000).then(() => {
    console.log('hello')
})