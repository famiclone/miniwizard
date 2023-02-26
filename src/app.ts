import DialogElement from "./dialog";
import { WizFile } from "./file";
import InputCommand from "./input-command";
import { defaultPalette } from "./palette";

export default class App {
  history: { prev: ImageData | null; next: ImageData | null } = {
    prev: null,
    next: null,
  };
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  zoom: number = 25;
  tool: "pencil" | "eraser" = "pencil";
  layer: number = 0;
  color: number = 1;
  file: WizFile = new WizFile();
  ui: HTMLElement = document.querySelector("#ui") as HTMLElement;
  startupDialog = new DialogElement("DialogStartup");
  helpDialog = new DialogElement("DialogHelp");
  inputCommand = new InputCommand("InputCmd", this);
  zoomElement = document.querySelector("#zoom") as HTMLInputElement;

  constructor() {
    this.canvas = document.createElement("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas.style.backgroundColor = "white";
    this.zoomElement.textContent = `${this.zoom * 100}%`;
    this.canvas.width = this.file.width;
    this.canvas.height = this.file.height;

    if (
      !window.localStorage.getItem("startup") ||
      window.localStorage.getItem("startup") === "true"
    ) {
      this.startupDialog.open();
    }

    //zoom canvas

    this.canvas.style.width = `${this.file.width * this.zoom}px`;
    this.canvas.style.height = `${this.file.height * this.zoom}px`;
    this.canvas.style.imageRendering = "pixelated";

    // ability to zoom in and out with mouse wheel
    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.zoomChange(e.deltaY);
    });

    document.body.querySelector("#main")!.append(this.canvas);

    const imageData = this.ctx.createImageData(16, 16);

    for (let l = 0; l > this.file.data.length; l++) {
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const color = this.file.palette
            ? this.file.palette[this.file.data[l][y][x]]
            : defaultPalette[this.file.data[l][y][x]];

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
      this.savePrevRev(this.ctx.getImageData(0, 0, 16, 16));
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / this.zoom);
      const y = Math.floor((e.clientY - rect.top) / this.zoom);
      const index = (y * 16 + x) * 4;
      imageData.data[index] = 0;
      imageData.data[index + 1] = 0;
      imageData.data[index + 2] = 0;
      imageData.data[index + 3] = 255;
      this.ctx.putImageData(imageData, 0, 0);

      this.saveNextRev(this.ctx.getImageData(0, 0, 16, 16));
    });

    // ability to draw pixel with mouse move
    this.canvas.addEventListener("mousemove", (e) => {
      if (e.buttons === 1) {
        this.savePrevRev(this.ctx.getImageData(0, 0, 16, 16));
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.zoom);
        const y = Math.floor((e.clientY - rect.top) / this.zoom);
        const index = (y * 16 + x) * 4;
        imageData.data[index] = 0;
        imageData.data[index + 1] = 0;
        imageData.data[index + 2] = 0;
        imageData.data[index + 3] = 255;
        this.ctx.putImageData(imageData, 0, 0);
        this.saveNextRev(this.ctx.getImageData(0, 0, 16, 16));
      }
    });

    // ability to undo changes with cmd + z
    document.addEventListener("keydown", (e) => {
      if (e.metaKey && e.key === "=") {
        e.preventDefault();
        this.zoomIn();

        return;
      }

      if (e.metaKey && e.key === "-") {
        e.preventDefault();
        this.zoomOut();

        return;
      }

      switch (e.key) {
        case "?":
          e.preventDefault();
          this.helpDialog.toggle();
          break;
        case "Escape":
          e.preventDefault();

          if (this.inputCommand.element.classList.contains("open")) {
            this.inputCommand.close();
          } else {
            this.inputCommand.open();
          }
      }
    });

    this.update();
  }

  update() {
    this.canvas.style.width = `${this.file.width * this.zoom}px`;
    this.canvas.style.height = `${this.file.height * this.zoom}px`;
    this.zoomElement.textContent = `${this.zoom * 100}%`;
  }

  newFile() {
    console.log("new");
  }

  undo() {
    if (this.history.prev) {
      console.log("undo");
      this.ctx.putImageData(this.history.prev, 0, 0);
    }
  }
  redo() {}
  savePrevRev(rev: ImageData | null) {
    this.history.prev = rev;
  }
  saveNextRev(rev: ImageData | null) {
    this.history.next = rev;
  }

  zoomChange(dt: number = 0) {
    const delta = Math.sign(dt);
    this.zoom += delta * 8;
    this.update();
  }

  zoomIn() {
    console.log("zoom in");
    this.zoomChange(1);
  }

  zoomOut() {
    console.log("zoom out");
    this.zoomChange(-1);
  }

  changeTool(tool: "pencil" | "eraser") {
    this.tool = tool;
  }
}
