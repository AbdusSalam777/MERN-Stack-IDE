export class Stack {

  constructor(maxSize = 10) {
    this.items = [];
    this.maxSize = maxSize;
  }

  push(item) {
    this.items.push(item);
    if (this.items.length > this.maxSize) this.shift();
  }

  pop() {
    return this.items.pop();
  }

  shift() {
    return this.items.shift();
  }

  clear() {
    this.items = [];
  }

  getAll() {
    return [...this.items];
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }
}

export const requestStack = new Stack(10);

export default function requestTracker(req, res, next) {

  if (req.path.startsWith("/req-history")) return next();

  const entry = {
    method: req.method,
    path: req.originalUrl,
    time: new Date().toISOString(),
  };

  const last = requestStack.peek();
  if (!last || last.method !== entry.method || last.path !== entry.path) {
    requestStack.push(entry);
  }
  
  next();
}
