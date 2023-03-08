export default class Layer {
  opacity: number = 255;
  visible: boolean = true;
  data: ImageData;

  constructor(
    public name: string = "New layer",
    public locked: boolean = false,
    public width: number,
    public height: number
  ) {
    this.data = new ImageData(width, height);
  }
}
