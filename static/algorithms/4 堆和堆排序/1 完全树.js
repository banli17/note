class MaxHeap {
	constructor(ary) {
		this.ary = ary
		this.lastIndex = this.ary.length - 1
		this.initHeap()
	}
	
	// 插入一个，直接插入到最后
	insertOne(ele) {
		this.ary.push(ele)
		this.sort()
	}
	
	outOne() {
		console.log(this.ary.shift())
	}
	
	initHeap() {
		this.ary.sort(function (a, b) {
			return b - a
		})
	}
	
	swap(a, b) {
		let c = this.ary[a]
		// console.log(a, b)
		this.ary[a] = this.ary[b]
		this.ary[b] = c
		// console.log(this.ary)
	}
	
	// 重排树，将元素与父级比较
	sort() {
		this.lastIndex = this.ary.length - 1
		let now = this.lastIndex
		let pIndex = Math.floor(now / 2); // 父index
		
		while (this.ary[pIndex] < this.ary[now]) {
			// console.log('x', pIndex, now)
			this.swap(pIndex, now)
			now = pIndex
			pIndex = Math.floor(now / 2)
		}
	}
}


let ary = [1, 4, 5, 10, 9, 20, 8, 6]

let h = new MaxHeap(ary)

h.outOne()

h.insertOne(90)
h.outOne()


h.insertOne(3)
h.outOne()
