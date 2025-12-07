class Node {

  constructor(data) {

    this.data = data;
    this.next = null;
  }

}

export default class LinkedList {

  constructor() {
    this.head = null;
  }

  // Insert at end

  insert(data) {

     if (this.find(data._id)){
        return;
     } 

    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    current.next = newNode;
  }

  // Remove by project id

  remove(id) {
    if (!this.head) return;

    // Case 1: head removal
    if (this.head.data._id === id) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    let prev = null;

    while (current && current.data._id !== id) {
      prev = current;
      current = current.next;
    }

    if (!current) return; // not found

    prev.next = current.next;
  }

  find(id) {
  let current = this.head;
  while (current) {
    if (current.data._id === id) return true;
    current = current.next;
  }
  return false;
}

  // Update (edit project)

  update(id, newData) {
    let current = this.head;

    while (current) {
      if (current.data._id === id) {
        current.data = { ...current.data, ...newData }; // merge fields
        return;
      }
      current = current.next;
    }
  }

  // Convert LL → Array for React UI

  toArray() {

    let arr = [];
    let current = this.head;

    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }
}
