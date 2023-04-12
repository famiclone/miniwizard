export default class Layer {
  opacity: number = 255;
  visible: boolean = true;
  data: ImageData;

  constructor(
    public name: string = "New Layer",
    public locked: boolean = false,
    public width: number = 16,
    public height: number = 16
  ) {
    this.data = new ImageData(width, height);
  }
}
