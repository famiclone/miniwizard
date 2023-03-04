import { WizFile } from "./file";
import History from "./history";
import Palette, { defaultPalette } from "./palette";
import Renderer from "./renderer";
import UI from "./ui";

const DEFAULT_WIDTH = 16;
const DEFAULT_HEIGHT = 16;

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

  saveFile(type: string) {
    console.log("save file as " + type);
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
