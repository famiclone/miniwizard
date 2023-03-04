import Layer from "./layer";
import Palette, { defaultPalette } from "./palette";

export class WizFile {
  palette: Palette;
  data: Layer[] = [];

  constructor(public width: number, public height: number) {
    this.palette = defaultPalette;
    this.data = [new Layer("Background", true, width, height)];
  }
}
