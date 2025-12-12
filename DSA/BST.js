
class Node {
  constructor(data) {
    this.data = data;   
    this.left = null;
    this.right = null;
  }
}

export default class SimpleBinaryTree {

  constructor() {
    this.root = null;
  }

  
  insertNode(node, data) {

    if (!node) {
      return new Node(data);
    }

    if (data.key < node.data.key) {
      node.left = this.insertNode(node.left, data);
    }
     else if (data.key > node.data.key) {
      node.right = this.insertNode(node.right, data);
    }

    return node;
  }

  insert(data) {
    this.root = this.insertNode(this.root, data);
  }

  // Traversals
  inOrder(node = this.root, result = []) {
    if (!node) return result;
    this.inOrder(node.left, result);
    result.push(node.data);
    this.inOrder(node.right, result);
    return result;
  }

  preOrder(node = this.root, result = []) {
    if (!node) return result;
    result.push(node.data);
    this.preOrder(node.left, result);
    this.preOrder(node.right, result);
    return result;
  }

  postOrder(node = this.root, result = []) {
    if (!node) return result;
    this.postOrder(node.left, result);
    this.postOrder(node.right, result);
    result.push(node.data);
    return result;
  }
}
