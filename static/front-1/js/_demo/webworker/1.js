const btn = document.querySelector('.btn')
const result = document.querySelector('.result')

btn.addEventListener('click', ()=> {
	setTimeout(()=> {
		console.log('gg')
	}, 0)
	
	const w = new Worker('2.js')
	w.onmessage = function (e) {
		result.innerText = e.data
	}
	
	
	console.log('333')
})
