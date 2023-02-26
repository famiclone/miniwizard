

export default class DialogElement {
  element: HTMLElement;
  closeBtn: HTMLElement;

  constructor(public selector: string) {
    this.element = document.querySelector(`#${selector}`)!;
    this.closeBtn = this.element.querySelector(`#btnClose${selector}`)!;

    this.closeBtn.addEventListener("click", () => {
      this.close();
    });
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
