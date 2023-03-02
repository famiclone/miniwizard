import { WizFile } from "./file";
import History from "./history";
import Palette, { defaultPalette } from "./palette";
import UI from "./ui";

export default class App {
  history: History = new History(this);
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
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

  constructor() {
    this.canvas = document.createElement("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas.style.backgroundColor = "white";
    this.canvas.width = this.files[this.fileIndex].width;
    this.canvas.height = this.files[this.fileIndex].height;

    //zoom canvas

    this.canvas.style.width = `${
      this.files[this.fileIndex].width * this.zoom
    }px`;
    this.canvas.style.height = `${
      this.files[this.fileIndex].height * this.zoom
    }px`;
    this.canvas.style.imageRendering = "pixelated";

    // ability to zoom in and out with mouse wheel
    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.zoomChange(e.deltaY);
    });

    document.body.querySelector("#main")!.append(this.canvas);

    const imageData = this.ctx.createImageData(16, 16);

    for (let l = 0; l > this.files[this.fileIndex].data.length; l++) {
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          const color = this.files[this.fileIndex].palette
            ? this.files[this.fileIndex].palette.getColor(
                this.files[this.fileIndex].data[l].data[y][x]
              )
            : defaultPalette.getColor(
                this.files[this.fileIndex].data[l].data[y][x]
              );

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

      //this.files[this.fileIndex].data[this.layerIndex].data[y][x] = this.color;
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
        //this.files[this.fileIndex].data[this.layerIndex].data[y][x] =
         // this.color;

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
    this.canvas.style.width = `${
      this.files[this.fileIndex].width * this.zoom
    }px`;
    this.canvas.style.height = `${
      this.files[this.fileIndex].height * this.zoom
    }px`;

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
