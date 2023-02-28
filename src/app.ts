import DialogElement from "./dialog";
import { WizFile } from "./file";
import InputCommand from "./input-command";
import Palette, { defaultPalette } from "./palette";

class History {
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

class UI {
  startupDialog = new DialogElement("DialogStartup");
  helpDialog = new DialogElement("DialogHelp");
  inputCommand = new InputCommand("InputCmd", this.app);
  zoomElement = document.querySelector("#zoom") as HTMLInputElement;
  primaryColorElement = document.querySelector("#toolPrColor") as HTMLElement;
  statusLine = document.querySelector("#statusLine") as HTMLElement;
  paletteDialog = new DialogElement("DialogPalette");
  paletteWrap = document.querySelector("#paletteWrap") as HTMLElement;
  paletteTitle = document.querySelector("#paletteTitle") as HTMLElement;
  to: any;

  constructor(private app: App) {
    this.app = app;
    if (
      !window.localStorage.getItem("startup") ||
      window.localStorage.getItem("startup") === "true"
    ) {
      this.startupDialog.open();
    }

    this.update();
  }

  renderPalette() {
    this.paletteWrap.innerHTML = "";
    this.paletteTitle.textContent = this.app.palette.name;
    this.app.palette.colors.forEach((color, index) => {
      const el = document.createElement("div");
      el.classList.add("color-swatch");
      el.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
      this.paletteWrap.append(el);
      el.addEventListener("click", () => {
        this.app.primaryColor = color;
        this.update();
      });
    });
  }

  log(msg: string) {
    this.to && clearTimeout(this.to);
    this.statusLine.classList.add("open");
    this.statusLine.textContent = msg;

    this.to = setTimeout(() => {
      this.statusLine.classList.remove("open");
      this.statusLine.textContent = "";
    }, 2000);
  }

  update() {
    this.renderPalette();
    this.zoomElement.textContent = `${this.app.zoom * 100}%`;
    this.primaryColorElement.style.backgroundColor = `rgba(${this.app.primaryColor[0]}, ${this.app.primaryColor[1]}, ${this.app.primaryColor[2]}, ${this.app.primaryColor[3]})`;
  }
}

export default class App {
  history: History = new History(this);
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  zoom: number = 25;
  tool: "pencil" | "eraser" = "pencil";
  layer: number = 0;
  color: number = 1;
  file: WizFile = new WizFile();
  palette: Palette = defaultPalette;
  primaryColor: number[] = this.palette.getColor(0);
  palettes: Palette[] = [this.palette];
  ui: UI = new UI(this);

  constructor() {
    this.canvas = document.createElement("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas.style.backgroundColor = "white";
    this.canvas.width = this.file.width;
    this.canvas.height = this.file.height;

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
            ? this.file.palette.getColor(this.file.data[l].data[y][x])
            : defaultPalette.getColor(this.file.data[l].data[y][x]);

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
      this.history.add(this.ctx.getImageData(0, 0, 16, 16));
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / this.zoom);
      const y = Math.floor((e.clientY - rect.top) / this.zoom);
      const index = (y * 16 + x) * 4;
      imageData.data[index] = this.primaryColor[0];
      imageData.data[index + 1] = this.primaryColor[1];
      imageData.data[index + 2] = this.primaryColor[2];
      imageData.data[index + 3] = this.primaryColor[3];
      this.ctx.putImageData(imageData, 0, 0);

      this.history.add(this.ctx.getImageData(0, 0, 16, 16));
    });

    // ability to draw pixel with mouse move
    this.canvas.addEventListener("mousemove", (e) => {
      if (e.buttons === 1) {
        this.history.add(this.ctx.getImageData(0, 0, 16, 16));
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.zoom);
        const y = Math.floor((e.clientY - rect.top) / this.zoom);
        const index = (y * 16 + x) * 4;
        imageData.data[index] = this.primaryColor[0];
        imageData.data[index + 1] = this.primaryColor[1];
        imageData.data[index + 2] = this.primaryColor[2];
        imageData.data[index + 3] = this.primaryColor[3];
        this.ctx.putImageData(imageData, 0, 0);
        this.history.add(this.ctx.getImageData(0, 0, 16, 16));
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

      if (e.metaKey && e.key === "0") {
        e.preventDefault();
        this.zoomReset();

        return;
      }

      if (e.metaKey && e.key === "z") {
        e.preventDefault();
        this.undo();

        return;
      }

      switch (e.key) {
        // if hold space and move mouse, move canvas
        case "Space":
          if (!this.ui.inputCommand.element.classList.contains("open")) {
            e.preventDefault();
            this.canvas.style.cursor = "grab";
            this.canvas.addEventListener("mousemove", (e) => {
              if (e.buttons === 1) {
                this.canvas.style.cursor = "grabbing";
                this.canvas.style.left = `${e.movementX}px`;
                this.canvas.style.top = `${e.movementY}px`;
              }
            });
          }
          break;
        case "?":
          e.preventDefault();
          this.ui.helpDialog.toggle();
          break;
        case "Escape":
          e.preventDefault();

          if (this.ui.inputCommand.element.classList.contains("open")) {
            this.ui.inputCommand.close();
          } else {
            this.ui.inputCommand.open();
          }
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case " ":
          e.preventDefault();
          this.canvas.style.cursor = "default";
          break;
      }
    });

    this.update();
  }

  update() {
    this.canvas.style.width = `${this.file.width * this.zoom}px`;
    this.canvas.style.height = `${this.file.height * this.zoom}px`;

    this.ui.update();
  }

  newFile() {
    console.log("new");
  }

  saveFile() {
    console.log("save");
  }

  undo() {
    this.history.undo();
  }
  redo() {
    this.history.redo();
  }

  zoomChange(dt: number = 0) {
    const delta = Math.sign(dt);
    this.zoom += delta * 8;
    this.update();
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
    this.zoom = 25;
    this.update();
  }

  changeTool(tool: "pencil" | "eraser") {
    this.tool = tool;
  }
}
