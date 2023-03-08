import Layer from "./layer";
import Palette, { defaultPalette } from "./palette";

export default class WizFile {
  palette: Palette;
  data: Layer[] = [];

  constructor(public width: number, public height: number) {
    this.palette = defaultPalette;
    this.data = [new Layer("Background", true, width, height)];
  }

  setCanvasSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.data.forEach((layer) => {
      const data = layer.data;
      layer.data = new ImageData(width, height);
      layer.data.data.set(data.data);
    });
  }
}
