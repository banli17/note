var items = [
	{name: 'Edward', value: 21},
	{name: 'Sharpe', value: 37},
	{name: 'And', value: 45},
	{name: 'The', value: -12},
	{name: 'Magnetic'},
	{name: 'Zeros', value: 37}
];


// 按名字
items.sort((a, b)=> {
	console.log('gg')
	const nameA = a.name.toLocaleLowerCase()
	const nameB = b.name.toLocaleLowerCase()
	if (nameA < nameB) {
		return -1
	}
	if (nameA > nameB) {
		return 1
	}
	return 0
})

console.log(items)