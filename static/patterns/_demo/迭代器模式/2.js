const Iterator = (arr)=> {
	let done = false
	let now = 0
	const next = ()=> {
		if (now == arr.length - 1) {
			done = true
		}
		return arr[now++]
	}
	
	return {
		done,
		next
	}
}

const i = Iterator([1, 5, 'a'])

console.log(i.next(), i.done)
console.log(i.next(), i.done)
console.log(i.next(), i.done)
console.log(i.next(), i.done)

