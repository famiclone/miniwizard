export default class Palette {
  colors: number[][] = [[]];

  constructor(public name: string = "New palette") {}

  addColor(color: number[]) {
    this.colors.push(color);
  }

  removeColor(index: number) {
    this.colors.splice(index, 1);
  }

  setColor(index: number, color: number[]) {
    this.colors[index] = color;
  }

  getColor(index: number) {
    return this.colors[index];
  }
}

export const defaultPalette = new Palette("Default");

defaultPalette.colors = [
  [0, 0, 0, 255],
  [255, 255, 255, 255],
  [255, 0, 0, 255],
  [0, 255, 0, 255],
  [0, 0, 255, 255],
];
