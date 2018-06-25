const https  = require('https')

https.get('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3113153671,3782273400&fm=27&gp=0.jpg', (res)=>{
	console.log(res.statusCode)
})