function notValid(val) {
	return typeof(val) !== 'number' || val === Infinity || val === -Infinity || isNaN(val) || val < 0; 
}

class Stack {
	constructor(maxLength = 10) {
		if ( notValid(maxLength) ||  arguments.length > 1) {
			throw new Error('Ошибка!');
		}

		this.items = [];
		this.maxLength = maxLength;

		this.push = this.push.bind(this);
		this.pop = this.pop.bind(this);
		this.peek = this.peek.bind(this);
		this.isEmpty = this.isEmpty.bind(this);
		this.toArray = this.toArray.bind(this);
	}
	
	push(elem) {
		if (this.items.length === this.maxLength) {
			throw new Error('Ошибка!');
		}

		this.items[this.items.length] = elem;
	}

	pop() {
		if (this.items.length === 0) {
			throw new Error('Ошибка!');
		}

		const prevItem = this.items[this.items.length - 1];

		this.items.length = this.items.length - 1;
		
		return prevItem;
	}

	peek() {
		if (this.items.length === 0) {
			return null;
		}

		return this.items[this.items.length - 1];
	}

	isEmpty() {
		if (this.items.length === 0) {
			return true;
		} else {
			return false;
		}
	}

	toArray() {
		const newArr = [];
		
		function toArr(stack, index) {
			newArr[index] = stack[index];

			if (index !== 0) {
				return toArr(stack, index - 1);
			}
		}

		toArr(this.items, this.items.length - 1);
		
		return newArr;
	}

	static fromIterable(iterable) {
		if ( !iterable[Symbol.iterator] ) {
			throw new Error('Ошибка!');
		}

		const newStack = new Stack(iterable.length);

		function fromIter(iter, index) {
			newStack.push( iter[index] );
			
			if (index !== iter.length - 1) {
				return fromIter(iter, index + 1);
			}
		}
		
		fromIter(iterable, 0);
		
		return newStack;
	}
}

module.exports = { Stack };
