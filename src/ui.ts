import App from "./app";
import DialogElement from "./ui/dialog";
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
  _container = document.querySelector("body")!;
  startupDialog = new DialogElement("Startup", this._container);
  helpDialog = new DialogElement("Help", this._container);
  inputCommand = new InputCommand("InputCmd", this.app);
  zoomElement = document.querySelector("#zoom") as HTMLInputElement;
  primaryColorElement = document.querySelector("#toolPrColor") as HTMLElement;
  statusLine = document.querySelector("#statusLine") as HTMLElement;
  layersDialog = new DialogElement("Layers", this._container);
  layersWrap = document.querySelector("#layersWrap") as HTMLElement;
  paletteDialog = new DialogElement("Palette", this._container);
  paletteWrap = this.paletteDialog.element.querySelector("#DialogBodyPalette")!;
  paletteTitle = this.paletteDialog.element.querySelector(
    "#DialogTitlePalette"
  )!;

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

    const wrap = document.createElement("div");
    wrap.className = "palette-wrap";

    this.paletteTitle.textContent = this.app.palette.name;
    this.app.palette.colors.forEach((color, index) => {
      const el = document.createElement("div");
      el.classList.add("color-swatch");
      el.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
      wrap.append(el);
      el.addEventListener("click", () => {
        this.app.primaryColor = color;
        this.update();
      });
    });
    this.paletteWrap.append(wrap);
  }

  renderLayers() {
    this.layersWrap.innerHTML = "";
    this.app.currentFile?.data.forEach((layer, index) => {
      const el = document.createElement("div");
      el.classList.add("layer");

      if (index === this.app.layerIndex) {
        el.classList.add("active");
      }

      el.textContent = layer.name;
      el.addEventListener("click", () => {
        this.app.layerIndex = index;
        this.update();
      });
      this.layersWrap.append(el);
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
    this.renderLayers();
    this.zoomElement.textContent = `${this.app.zoom * 100}%`;
    this.primaryColorElement.style.backgroundColor = `rgba(${this.app.primaryColor[0]}, ${this.app.primaryColor[1]}, ${this.app.primaryColor[2]}, ${this.app.primaryColor[3]})`;
  }
}
