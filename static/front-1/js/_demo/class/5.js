function* say(){
	return 'hello'
	yield 3
}

const s = say()

console.log(s.next())  // {value:'hello',done:false}
console.log(s.next())  // {value:undefined,done:true}

