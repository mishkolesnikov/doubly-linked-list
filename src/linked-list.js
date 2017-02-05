const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);
        if (this.length == 0){
            this._head = node;
            this._tail = node;
            this.length = 1;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
            this.length ++;
        }
        return this;
    }

    head() {
        return (!!this._head) ? this._head.data : null;
    }

    tail() {
        return (!!this._tail) ? this._tail.data : null;
    }

    at(index) {
        let node = this._head;
        for(let i = 0; i < this.length; i++){
            if (i == index) return node.data;
            else node = node.next;
            }
        }

    insertAt(index, data) {
        const apphead = (data) => {
            let node = new Node(data);
            if (this.length == 0){
                this._head = node;
                this._tail = node;
                this.length = 1;
            } else {
                this._head.prev = node;
                node.next = this._head;
                this._head = node;
                this.length ++;
            }
        }
        if(index == this.length) this.append(data);
        else if (index == 0) apphead(data);
        else{
            let newNode = new Node(data);
            let node = this._head.next;
            for(let i = 1; i < this.length; i++){
                if (i == index){
                    node.prev.next = newNode;
                    newNode.next = node;
                    newNode.prev = node.prev;
                    node.prev = newNode;
                    this.length ++;
                }else node = node.next;
            }
        }
        return this;
    }

    isEmpty() {
        return (!!this.length == 0);
    }

    clear() {
        delete this._head;
        delete this._tail;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if(this.length != 0){
            let node = this._head;
            if(index == 0){
                if (!!node.next) {
                    node.next.prev = null;
                    this._head = node.next;
                } else this.clear();
            } else if (index == this.length - 1){
                this._tail.prev.next = null;
                this._tail = this._tail.prev;
            } else {
                for(let i = 1; i < this.length - 1; i++){
                    if (i == index){
                        node.prev.next = node.next;
                        node.next.prev = node.prev;
                        break;
                    } else node = node.next;
                }
            }
            this.length--;
        }
        return this;
    }

    reverse() {
        let node = this._head;
        let nodePrev = new Node;
        this._head = this._tail;
        this._tail = node;
        for (let i = 0; i < this.length; i ++){
            nodePrev = node.prev;
            node.prev = node.next;
            node.next = nodePrev;
            node = node.prev;
        }
        return this;
    }

    indexOf(data){
        let node = this._head;
        for(let i = 0; i < this.length; i++){
            if(node.data == data){
                return i;
            } else node = node.next
        }
        return -1;
    }
}

module.exports = LinkedList;
