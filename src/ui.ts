import App from "./app";
import DialogElement from "./dialog";
import InputCommand from "./input-command";

class Tab {
  element: HTMLElement;
  closeBtn: HTMLElement;
  id: string = Date.now().toString();
  tabTitle: HTMLElement;

  constructor(public title: string) {
    this.element = document.createElement("div");
    this.tabTitle = document.createElement("span");
    this.element.id = this.id;
    this.element.classList.add("tab");
    this.closeBtn = document.createElement("button");

    this.closeBtn.id = `#btnClose${this.id}`;
    this.closeBtn.textContent = "X";
    this.tabTitle.textContent = title;

    this.element.append(this.tabTitle, this.closeBtn);

    document.querySelector("#tabs")!.appendChild(this.element);

    this.closeBtn.addEventListener("click", () => {
      this.close();
    });
  }

  deactivateTab() {
    this.element.classList.remove("active");
  }

  activateTab() {
    this.element.classList.add("active");
  }

  rename(title: string) {
    this.title = title;
    this.tabTitle.textContent = title;
  }

  close() {
    this.element.removeAttribute("open");
  }
}

export default class UI {
  startupDialog = new DialogElement("DialogStartup");
  helpDialog = new DialogElement("DialogHelp");
  inputCommand = new InputCommand("InputCmd", this.app);
  zoomElement = document.querySelector("#zoom") as HTMLInputElement;
  primaryColorElement = document.querySelector("#toolPrColor") as HTMLElement;
  statusLine = document.querySelector("#statusLine") as HTMLElement;
  paletteDialog = new DialogElement("DialogPalette");
  paletteWrap = document.querySelector("#paletteWrap") as HTMLElement;
  paletteTitle = document.querySelector("#paletteTitle") as HTMLElement;
  tabs: HTMLElement = document.querySelector("#tabs") as HTMLElement;
  to: any;

  constructor(private app: App) {
    this.app = app;
    if (
      !window.localStorage.getItem("startup") ||
      window.localStorage.getItem("startup") === "true"
    ) {
      this.startupDialog.open();
    }

    this.tabs.append(new Tab("Untitled").element);


    this.update();
  }

  renderPalette() {
    this.paletteWrap.innerHTML = "";
    this.paletteTitle.textContent = this.app.palette.name;
    this.app.palette.colors.forEach((color, index) => {
      const el = document.createElement("div");
      el.classList.add("color-swatch");
      el.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
      this.paletteWrap.append(el);
      el.addEventListener("click", () => {
        this.app.primaryColor = color;
        this.update();
      });
    });
  }

  log(msg: string) {
    this.to && clearTimeout(this.to);
    this.statusLine.classList.add("open");
    this.statusLine.textContent = msg;

    this.to = setTimeout(() => {
      this.statusLine.classList.remove("open");
      this.statusLine.textContent = "";
    }, 2000);
  }

  update() {

    this.renderPalette();
    this.zoomElement.textContent = `${this.app.zoom * 100}%`;
    this.primaryColorElement.style.backgroundColor = `rgba(${this.app.primaryColor[0]}, ${this.app.primaryColor[1]}, ${this.app.primaryColor[2]}, ${this.app.primaryColor[3]})`;
  }
}