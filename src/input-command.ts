import App, { SaveOptions } from "./app";
import UI from "./ui";

export default class InputCommand {
  commands: { [key: string]: Function } = {
    n: () => {
      this.app.newFile();
    }, // new
    nl: () => {
      this.app.newLayer();
    }, // new layer
    l: () => {
      this.app.ui.layersDialog.toggle();
    },
    e: () => {}, // open
    w: (type: string, scale: string) => {
      this.app.saveFile(type, { scale: parseInt(scale) });
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
    hs: () => {
      this.app.ui.startupDialog.toggle();
    },
    cs: (theme: string) => {
      this.app.ui.setColorScheme(theme);
    }
  };

  app: App;
  element: HTMLInputElement;

  constructor(app: App) {
    this.app = app;
    this.element = document.createElement("input") as HTMLInputElement;
    this.element.id = "InputCommand";
    this.element.className = "input input--cmd"
    console.log(this.app.ui);

    this.app.ui._container.append(this.element);
    
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
