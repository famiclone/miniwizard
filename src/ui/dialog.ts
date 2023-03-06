export default class DialogElement {
  element: HTMLDialogElement;
  closeBtn: HTMLElement;
  header: HTMLElement;
  _template: string = `
    <style>
      .dialog {
        background-color: var(--bg-color);
        border-radius: 0.5rem;
        border: 1px solid var(--mid-color);
        color: var(--fg-color);
        min-width: 320px;
        width: 500px;
      }
    </style>

    <div class="d-flex" id="DialogHeader${this.name}">
      <div id="DialogTitle${this.name}">Dialog</div>
      <button class="btn btn--icon" id="BtnCloseDialog${this.name}">
        X
      </button>
    </div>
    <div class="DialogBody DialogBody${this.name}" id="DialogBody${this.name}"></div>
  `;

  constructor(
    public name: string,
    public container: HTMLElement,
    open: boolean = false
  ) {
    this.element = document.createElement("dialog")!;
    this.element.className = `dialog Dialog${this.name}`;
    this.element.open = open;
    this.container.append(this.element);

    console.log(this.name);
    this.header = this.element.querySelector(`#DialogHeader${name}`)!;

    this.element.id = `Dialog${name}`;
    this.element.innerHTML = this._template;

    this.closeBtn = this.element.querySelector(`#BtnCloseDialog${name}`)!;

    this.closeBtn.addEventListener("click", () => {
      this.close();
    });
  }

  drag(e: MouseEvent) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    pos3 = e.clientX;
    pos4 = e.clientY;

    const elementDrag = (e: MouseEvent) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      this.element.style.top = this.element.offsetTop - pos2 + "px";
      this.element.style.left = this.element.offsetLeft - pos1 + "px";
    };

    const closeDragElement = () => {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    };

    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("mousemove", elementDrag);
  }

  move(x: number, y: number) {
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  toggle() {
    if (this.element.hasAttribute("open")) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.element.setAttribute("open", "");
  }

  close() {
    this.element.removeAttribute("open");
    window.localStorage.setItem("startup", "false");
  }
}
