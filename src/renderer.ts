import App from "./app";
import { WizFile } from "./file";
import { defaultPalette } from "./palette";

export default class Renderer {
  _canvas: HTMLCanvasElement;
  _ctx: CanvasRenderingContext2D;
  zoom: number = 25;
  file: WizFile = this.app.files[this.app.fileIndex];

  constructor(public app: App) {
    this._canvas = document.createElement("canvas") as HTMLCanvasElement;
    this._ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.canvas.style.backgroundColor = "white";
    this.canvas.width = this.app.files[this.app.fileIndex].width;
    this.canvas.height = this.app.files[this.app.fileIndex].height;

    this.canvas.style.imageRendering = "pixelated";
    this.setZoom(this.zoom);

    // ability to zoom in and out with mouse wheel
    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.zoomChange(e.deltaY);
    });

    document.body.querySelector("#main")!.append(this.canvas);

    const imageData = this.ctx.createImageData(16, 16);

    const file = this.app.files[this.app.fileIndex];

    for (let l = 0; l > file.data.length; l++) {
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const color = file.palette
            ? file.palette.getColor(file.data[l].data[y][x])
            : defaultPalette.getColor(file.data[l].data[y][x]);

          const index = (y * 16 + x) * 4;

          imageData.data[index] = color[0];
          imageData.data[index + 1] = color[1];
          imageData.data[index + 2] = color[2];
          imageData.data[index + 3] = color[3];
        }
      }
    }

    this.ctx.putImageData(imageData, 0, 0);

    // ability to draw pixel with mouse click
    this.canvas.addEventListener("click", (e) => {
      this.app.history.add(this.ctx.getImageData(0, 0, 16, 16));
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / this.zoom);
      const y = Math.floor((e.clientY - rect.top) / this.zoom);
      const index = (y * 16 + x) * 4;

      //this.files[this.fileIndex].data[this.layerIndex].data[y][x] = this.color;
      imageData.data[index] = this.app.primaryColor[0];
      imageData.data[index + 1] = this.app.primaryColor[1];
      imageData.data[index + 2] = this.app.primaryColor[2];
      imageData.data[index + 3] = this.app.primaryColor[3];
      this.ctx.putImageData(imageData, 0, 0);

      this.app.history.add(this.ctx.getImageData(0, 0, 16, 16));
    });

    // ability to draw pixel with mouse move
    this.canvas.addEventListener("mousemove", (e) => {
      if (e.buttons === 1) {
        this.app.history.add(this.ctx.getImageData(0, 0, 16, 16));
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.zoom);
        const y = Math.floor((e.clientY - rect.top) / this.zoom);
        const index = (y * 16 + x) * 4;
        //this.files[this.fileIndex].data[this.layerIndex].data[y][x] =
        // this.color;

        imageData.data[index] = this.app.primaryColor[0];
        imageData.data[index + 1] = this.app.primaryColor[1];
        imageData.data[index + 2] = this.app.primaryColor[2];
        imageData.data[index + 3] = this.app.primaryColor[3];
        this.ctx.putImageData(imageData, 0, 0);
        this.app.history.add(this.ctx.getImageData(0, 0, 16, 16));
      }
    });
  }

  get canvas() {
    return this._canvas;
  }

  get ctx() {
    return this._ctx;
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
