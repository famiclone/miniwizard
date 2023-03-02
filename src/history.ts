import App from "./app";

export default class History {
  items: ImageData[] = [];
  cursor: number = this.items.length - 1;

  constructor(private app: App) {}

  add(item: ImageData) {
    this.items.push(item);
    this.cursor = this.items.length - 1;
  }

  clearFromCursor() {
    this.items.splice(this.cursor + 1);
  }

  undo() {
    if (this.cursor > 0) {
      this.cursor--;
      this.app.ctx.putImageData(this.items[this.cursor], 0, 0);
    }
  }

  redo() {
    if (this.cursor < this.items.length - 1) {
      this.cursor++;
      this.app.ctx.putImageData(this.items[this.cursor], 0, 0);
    }
  }
}
