class LinkedList {
	constructor() {
		if (arguments.length) {
			throw new Error('Ошибка!');
		}

		this.items = [];
		
		this.append = this.append.bind(this);
		this.prepend = this.prepend.bind(this);
		this.find = this.find.bind(this);
		this.toArray = this.toArray.bind(this);
	}
	
	append(elem) {
		this.items[this.items.length] = elem;
	}

	prepend(elem) {
		function add(list, index) {
			if (index > 0) {
				list[index] = list[index - 1];

				return add(list, index - 1);
			} else {
				list[index] = elem;
			}
		}

		add(this.items, this.items.length);
	}

	find(elem) {
		function findElem(list, index) {
			if (list[index] === elem) {
				return elem;
			} else if (index === list.length) {
				return null;
			} else {
				return findElem(list, index + 1);
			}
		}

		return findElem(this.items, 0);
	}

	toArray() {
		const newArr = [];
		
		function toArr(list, index) {
			newArr[index] = list[index];

			if ( list[index + 1] ) {
				return toArr(list, index + 1);
			}
		}

		toArr(this.items, 0);
		
		return newArr;
	}

	static fromIterable(iterable) {
		if ( !iterable[Symbol.iterator] ) {
			throw new Error('Ошибка!');
		}

		const newLinkedList = new LinkedList();

		function fromIter(iter, index) {
			newLinkedList.append( iter[index] );
			
			if ( iter[index + 1] ) {
				return fromIter(iter, index + 1);
			}
		}
		
		fromIter(iterable, 0);
		
		return newLinkedList;
	}
}

module.exports = { LinkedList };
