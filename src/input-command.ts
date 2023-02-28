import App from "./app";

export default class InputCommand {
  commands: { [key: string]: Function } = {
    n: () => {
      this.app.newFile();
    }, // new
    e: () => {}, // open
    w: () => {
      this.app.saveFile();
    }, // save
    h: () => {
      this.app.ui.helpDialog.toggle();
      this.app.ui.log("Help");
    }, // help
    p: () => {
      this.app.ui.paletteDialog.toggle();
      this.app.ui.log("Open palette");
    }, // current palette
    P: () => {}, // palettes
    log: (msg: string) => {
      this.app.ui.log(msg);
    },
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

    console.log(command, args);
    if (command in this.commands) {
      this.commands[command](...args);
    } else {
      this.app.ui.log(`command not found: ${command}`);
    }
  }
}
