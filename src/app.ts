import { WizFile } from "./file";
import History from "./history";
import Layer from "./layer";
import Palette, { defaultPalette } from "./palette";
import Renderer from "./renderer";
import UI from "./ui";

const DEFAULT_WIDTH = 16;
const DEFAULT_HEIGHT = 16;

export type SaveOptions = {
  scale: number;
};

export default class App {
  history: History = new History(this);
  zoom: number = 25;
  tool: "pencil" | "eraser" | "bucket" = "pencil";
  color: number = 1;
  files: WizFile[] = [];
  fileIndex: number = 0;
  palette: Palette = defaultPalette;
  primaryColor: number[] = this.palette.getColor(0);
  palettes: Palette[] = [this.palette];
  ui: UI = new UI(this);
  layerIndex: number = 0;
  renderer: Renderer;
  constructor() {
    this.files.push(new WizFile(DEFAULT_WIDTH, DEFAULT_HEIGHT));
    this.renderer = new Renderer(this);

    this.setup();
  }

  get currentFile() {
    return this.files[this.fileIndex];
  }

  setup() {
    // ability to undo changes with cmd + z
    document.addEventListener("keydown", (e) => {
      if (e.metaKey && e.key === "=") {
        e.preventDefault();
        this.renderer.zoomIn();

        return;
      }

      if (e.metaKey && e.key === "-") {
        e.preventDefault();
        this.renderer.zoomOut();

        return;
      }

      if (e.metaKey && e.key === "0") {
        e.preventDefault();
        this.renderer.zoomReset();

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
            this.renderer.canvas.style.cursor = "grab";
            this.renderer.canvas.addEventListener("mousemove", (e) => {
              if (e.buttons === 1) {
                this.renderer.canvas.style.cursor = "grabbing";
                this.renderer.canvas.style.left = `${e.movementX}px`;
                this.renderer.canvas.style.top = `${e.movementY}px`;
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
          this.renderer.canvas.style.cursor = "default";
          break;
      }
    });

    this.update();
  }

  update() {
    this.renderer.update();
    this.ui.update();
  }

  newFile() {
    console.log("new");
  }

  newLayer() {
    const layer = new Layer(
      "Layer " + (this.currentFile.data.length + 1),
      false,
      this.currentFile.width,
      this.currentFile.height
    );

    this.currentFile.data.push(layer);
    this.layerIndex = this.currentFile.data.length - 1;

    this.update();
  }

  saveFile(type: string, options: SaveOptions = { scale: 1 }) {
    if (type === "png") {
      const dataUrl = this.renderer.canvas.toDataURL("image/png");
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d") as CanvasRenderingContext2D;
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        c.width = img.width * options.scale;
        c.height = img.height * options.scale;
        ctx.drawImage(img, 0, 0, c.width, c.height);
        const a = document.createElement("a");
        a.href = c.toDataURL("image/png");
        a.download = "image.png";
        a.click();
      };

      this.ui.log(`save file as ${type}`);

      return;
    }

    this.ui.log(`filetype ${type} is not supported`);
  }

  undo() {
    this.history.undo();
  }
  redo() {
    this.history.redo();
  }

  changeTool(tool: "pencil" | "eraser") {
    this.tool = tool;
  }
}
