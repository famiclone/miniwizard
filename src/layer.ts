export default class Layer {
  opacity: number = 255;
  visible: boolean = true;
  data: number[][] = [[]];

  constructor(public name: string = "New layer", public locked: boolean = false) {}
}
