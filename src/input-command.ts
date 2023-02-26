import App from "./app";

export default class InputCommand {
  commands: { [key: string]: Function } = {
    n: () => {
      this.app.newFile();
    }, // new
    e: () => {}, // open
    w: () => {}, // save
    h: () => {
      this.app.helpDialog.toggle();
    }, // help
    p: () => {}, // current palette
    P: () => {}, // palettes
  };

  element: HTMLInputElement;

  constructor(public selector: string, public app: App) {
    this.element = document.querySelector(`#${selector}`) as HTMLInputElement;

    this.element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.execute(this.element.value);
        this.close();
      }
    });
  }

  open() {
    this.element.classList.add("open");
    this.element.focus();
    this.element.value = ":";
  }

  close() {
    this.element.classList.remove("open");
    this.element.value = "";
  }

  execute(cmd: string) {
    cmd = cmd.slice(1);
    const [command, ...args] = cmd.split(" ");
    if (command in this.commands) {
      this.commands[command](...args);
    }
  }
}
