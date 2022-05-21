
process.send('hello')

process.on('message', (data) => {
    console.log('child data', data);
})