import App from "./app";
import { WizFile } from "./file";
import { defaultPalette } from "./palette";

export default class Renderer {
  _canvas: HTMLCanvasElement;
  _ctx: CanvasRenderingContext2D;
  zoom: number = 25;
  file: WizFile = this.app.files[this.app.fileIndex];
  grid: boolean = true;
  gridSize: number = 16;

  constructor(public app: App) {
    this._canvas = document.createElement("canvas") as HTMLCanvasElement;
    this._ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.canvas.style.backgroundColor = "white";
    this.canvas.width = this.app.files[this.app.fileIndex].width;
    this.canvas.height = this.app.files[this.app.fileIndex].height;

    this.canvas.style.backgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><rect width='16' height='16' fill='none'/><rect x='0' y='0' width='8' height='8' fill='%23f0f0f0'/><rect x='8' y='8' width='8' height='8' fill='%23f0f0f0'/></svg>")`;
    this.canvas.style.backgroundSize = "16px 16px";

    this.canvas.style.imageRendering = "pixelated";
    this.setZoom(this.zoom);

    // ability to zoom in and out with mouse wheel
    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.zoomChange(e.deltaY);
    });

    document.body.querySelector("#main")!.append(this.canvas);

    const imageData = this.ctx.createImageData(
      this.file.width,
      this.file.height
    );

    // ability to draw pixel with mouse click
    this.canvas.addEventListener("click", (e) => {
      this.app.history.add(
        this.ctx.getImageData(0, 0, this.file.width, this.file.height)
      );
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / this.zoom);
      const y = Math.floor((e.clientY - rect.top) / this.zoom);
      const index = (y * this.file.width + x) * 4;

      //this.files[this.fileIndex].data[this.layerIndex].data[y][x] = this.color;
      imageData.data[index] = this.app.primaryColor[0];
      imageData.data[index + 1] = this.app.primaryColor[1];
      imageData.data[index + 2] = this.app.primaryColor[2];
      imageData.data[index + 3] = this.app.primaryColor[3];
      this.ctx.putImageData(imageData, 0, 0);

      this.app.history.add(
        this.ctx.getImageData(0, 0, this.file.width, this.file.height)
      );
    });

    // ability to draw pixel with mouse move
    this.canvas.addEventListener("mousemove", (e) => {
      if (e.buttons === 1) {
        this.app.history.add(
          this.ctx.getImageData(0, 0, this.file.width, this.file.height)
        );
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.zoom);
        const y = Math.floor((e.clientY - rect.top) / this.zoom);
        const index = (y * this.file.width + x) * 4;
        //this.files[this.fileIndex].data[this.layerIndex].data[y][x] =
        // this.color;

        imageData.data[index] = this.app.primaryColor[0];
        imageData.data[index + 1] = this.app.primaryColor[1];
        imageData.data[index + 2] = this.app.primaryColor[2];
        imageData.data[index + 3] = this.app.primaryColor[3];
        this.ctx.putImageData(imageData, 0, 0);
        this.app.history.add(
          this.ctx.getImageData(0, 0, this.file.width, this.file.height)
        );
      }
    });
  }

  get canvas() {
    return this._canvas;
  }

  get ctx() {
    return this._ctx;
  }

  drawRect(x: number, y: number, w: number, h: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  fill(
    startX: number,
    startY: number,
    targetColor: number,
    replaceColor: number
  ) {
    const matrix = this.file.data[this.app.layerIndex].data;

    // Check if the start coordinates are out of bounds
    if (
      startX < 0 ||
      startX >= matrix.width ||
      startY < 0 ||
      startY >= matrix.height
    ) {
      return;
    }

    const index = startY * matrix.width + startX;

    // Check if the target value matches the replacement value
    if (matrix.data[index] === replaceColor) {
      return;
    }

    // Check if the current value matches the target value
    if (matrix.data[index] !== targetColor) {
      return;
    }

    // Replace the current value with the replacement value
    matrix.data[index] = replaceColor;

    // Recursively fill adjacent cells
    this.fill(startX + 1, startY, targetColor, replaceColor); // Right
    this.fill(startX - 1, startY, targetColor, replaceColor); // Left
    this.fill(startX, startY + 1, targetColor, replaceColor); // Down
    this.fill(startX, startY - 1, targetColor, replaceColor); // Up
  }

  setZoom(zoom: number) {
    this.zoom = zoom;

    this.canvas.style.width = `${this.file.width * this.zoom}px`;
    this.canvas.style.height = `${this.file.height * this.zoom}px`;
    this.update();
  }

  zoomChange(dt: number = 0) {
    const delta = Math.sign(dt);
    this.zoom += delta * 8;
    this.setZoom(this.zoom);
  }

  zoomIn() {
    console.log("zoom in");
    if (this.zoom < 128) {
      this.zoomChange(1);
    }
  }

  zoomOut() {
    console.log("zoom out");
    if (this.zoom > 1) {
      this.zoomChange(-1);
    }
  }

  zoomReset() {
    console.log("zoom reset");
    this.setZoom(25);
  }

  update() {
    requestAnimationFrame(this.update.bind(this));
  }
}
