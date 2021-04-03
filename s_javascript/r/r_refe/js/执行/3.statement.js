// {
//     console.log(1)
//     return 1
//     console.log(2)
// }

// if(true){
//     console.log('true')
// }

async function a(){
    await new Promise((resolve)=>{
        console.log('-------')
        resolve()
    })
}
a()
console.log('hi')
