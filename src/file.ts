import Layer from "./layer";
import Palette, { defaultPalette } from "./palette";

export class WizFile {
  width: number;
  height: number;
  palette: Palette;
  data: Layer[] = [];

  constructor() {
    this.width = 16;
    this.height = 16;
    this.palette = defaultPalette;
    this.data = [new Layer()];
  }
}
