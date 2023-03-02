import { WizFile } from "./file";
import History from "./history";
import Palette, { defaultPalette } from "./palette";
import Renderer from "./renderer";
import UI from "./ui";

export default class App {
  history: History = new History(this);
  zoom: number = 25;
  tool: "pencil" | "eraser" | "bucket" = "pencil";
  color: number = 1;
  files: WizFile[] = [new WizFile(), new WizFile()];
  fileIndex: number = 0;
  palette: Palette = defaultPalette;
  primaryColor: number[] = this.palette.getColor(0);
  palettes: Palette[] = [this.palette];
  ui: UI = new UI(this);
  layerIndex: number = 0;
  renderer: Renderer = new Renderer(this);

  constructor() {
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

  fill(
    startX: number,
    startY: number,
    targetColor: number,
    replaceColor: number
  ) {
    const matrix = this.files[this.fileIndex].data[this.layerIndex].data;

    // Check if the start coordinates are out of bounds
    if (
      startX < 0 ||
      startX >= matrix.length ||
      startY < 0 ||
      startY >= matrix[0].length
    ) {
      return;
    }

    // Check if the target value matches the replacement value
    if (matrix[startX][startY] === replaceColor) {
      return;
    }

    // Check if the current value matches the target value
    if (matrix[startX][startY] !== targetColor) {
      return;
    }

    // Replace the current value with the replacement value
    matrix[startX][startY] = replaceColor;

    // Recursively fill adjacent cells
    this.fill(startX + 1, startY, targetColor, replaceColor); // Right
    this.fill(startX - 1, startY, targetColor, replaceColor); // Left
    this.fill(startX, startY + 1, targetColor, replaceColor); // Down
    this.fill(startX, startY - 1, targetColor, replaceColor); // Up
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
