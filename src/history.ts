class HistoryNode {
  timestamp: number = Date.now();
  constructor(public data: ImageData) {}
}

export default class History {
  max: number = 5;
  stack: HistoryNode[] = [];
  buffer: HistoryNode | null = null;

  add(data: ImageData) {
    if (this.stack.length >= this.max) {
      this.stack.shift();
    }
    this.stack.push(new HistoryNode(data));
  }

  undo() {
    if (this.stack.length > 0) {
      this.buffer = this.stack.pop()!;

      return this.buffer.data;
    }

    return null;
  }

  redo() {
    if (this.buffer) {
      this.stack.push(this.buffer);
      this.buffer = null;

      return this.stack[this.stack.length - 1].data;
    }

    return null;
  }

  clear() {
    this.stack = [];
  }
}
