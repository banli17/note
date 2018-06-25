class MaxHeap {
	constructor() {
		this.arr = [undefined];
		this.count = 0;
	}
	
	_swap(k, i) {
		let s = this.arr[k];
		this.arr[k] = this.arr[i];
		this.arr[i] = s;
	}
	
	_shiftUp(i) {
		let k = Math.floor(i / 2);
		if (i > 1 && this.arr[k] < this.arr[i]) {
			this._swap(k, i);
		}
	}
	
	_shiftDown(i) {
		if (2 * i <= this.count) {
			let k = 2 * i; // 假设i需要和k交换位置
			
			if (
				2 * i + 1 <= this.count &&
				this.arr[2 * i + 1] > this.arr[2 * i]
			) {
				k = 2 * i + 1;
			}
			
			if (this.arr[k] > this.arr[i]) {
				this._swap(k, i);
			}
		}
	}
	
	insert(el) {
		this.count++;
		this.arr[this.count] = el;
		
		for (let i = 1; i <= this.count; i++) {
			this._shiftUp(i);
		}
	}
	
	get() {
		return this.arr
	}
	
	
	extract() {
		let max = this.arr[1];
		
		this.arr[1] = this.arr[this.count];
		this.count--;
		
		for (let i = 1; i <= this.count; i++) {
			this._shiftDown(i);
		}
		return max;
	}
}

let h = new MaxHeap();

for (let i = 0; i < 10; i++) {
	h.insert(Math.round(Math.random() * 1000));
}

// 打印完全树
function printTest(maxheap) {
	
}

// console.log(h.extract());
printTest(h.get())

