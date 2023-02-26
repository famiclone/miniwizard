

export class WizFile {
  width: number;
  height: number;
  palette: number[][];
  data: number[][][];

  constructor() {
    this.width = 16;
    this.height = 16;
    this.palette = [];
    this.data = Array(1).fill(Array(16).fill(Array(16).fill(0)));
  }
}
