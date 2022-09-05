function notValid(val) {
  return (
    typeof val !== "number" ||
    val === Infinity ||
    val === -Infinity ||
    isNaN(val) ||
    val < 0
  );
}

class Node {
  constructor(elem){
    this.element = elem;
    this.next = null;
  }
}

class Stack {
	constructor(maxLength = 10) {
		if ( notValid(maxLength) ||  arguments.length > 1) {
			throw new Error('Ошибка!');
		}

		this.length = 0;
		this.head = null;
		this.maxLength = maxLength;

		this.push = this.push.bind(this);
		this.pop = this.pop.bind(this);
		this.peek = this.peek.bind(this);
		this.isEmpty = this.isEmpty.bind(this);
		this.toArray = this.toArray.bind(this);
	}

	push(elem) {
		if (this.length === this.maxLength) {
			throw new Error('Ошибка! Стек переполнен!');
		}

		let node = new Node(elem);
    		let current;

		current = this.head;
    		node.next = current;
    		this.head = node;

		this.length++;
	}

	pop() {
		if (!this.head) {
			throw new Error('Ошибка! Cтек пуст!');
		}

		let current = this.head; 
    		let elem = current.element;

    		current = current.next;
    		this.head = current;
    		this.length--;
    
		return elem;  
  	}
	

	peek() {
		if(this.head){    
      			return this.head.element;
    		}

    		return null; 
  	}

	isEmpty() {
		return this.length === 0;
	}

	toArray() {
		let arr = [];
    		let current = this.head;
    
		while(current){
      			arr.unshift(current.element);
      			current = current.next;
    		}
    
    		return arr;
	}

	static fromIterable(iterable) {
		if ( !iterable[Symbol.iterator] ) {
			throw new Error('Ошибка! Не итерируемая сущность');
		}

		const newStack = new Stack(iterable.length);

		for (let item of iterable) {
			newStack.push(item);
		}

		return newStack;
	}
}

module.exports = { Stack };
