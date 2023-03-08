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

// NES palette
defaultPalette.colors = [
  [0, 0, 0, 255],
  [252, 252, 252, 255],
  [248, 248, 248, 255],
  [188, 188, 188, 255],
  [124, 124, 124, 255],
  [164, 228, 252, 255],
  [60, 188, 252, 255],
  [0, 120, 248, 255],
  [0, 0, 252, 255],
  [184, 184, 248, 255],
  [104, 136, 252, 255],
  [0, 88, 248, 255],
  [0, 0, 188, 255],
  [216, 184, 248, 255],
  [152, 120, 248, 255],
  [104, 68, 252, 255],
  [68, 40, 188, 255],
  [248, 184, 248, 255],
  [248, 120, 248, 255],
  [216, 0, 204, 255],
  [148, 0, 132, 255],
  [248, 164, 192, 255],
  [248, 88, 152, 255],
  [228, 0, 88, 255],
  [168, 0, 32, 255],
  [240, 208, 176, 255],
  [248, 120, 88, 255],
  [248, 56, 0, 255],
  [168, 16, 0, 255],
  [252, 224, 168, 255],
  [252, 160, 68, 255],
  [228, 92, 16, 255],
  [136, 20, 0, 255],
  [248, 216, 120, 255],
  [248, 184, 0, 255],
  [172, 124, 0, 255],
  [80, 40, 0, 255],
  [216, 248, 120, 255],
  [184, 248, 24, 255],
  [0, 184, 0, 255],
  [0, 120, 0, 255],
  [184, 248, 184, 255],
  [88, 216, 84, 255],
  [0, 168, 0, 255],
  [0, 104, 0, 255],
  [184, 248, 216, 255],
  [88, 248, 152, 255],
  [0, 168, 68, 255],
  [0, 88, 0, 255],
  [0, 252, 252, 255],
  [0, 232, 216, 255],
  [0, 136, 136, 255],
  [0, 64, 88, 255],
  [248, 216, 248, 255],
  [120, 120, 120, 255],
];