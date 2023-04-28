
export default class Keyboard {
  constructor(rowsButtons) {
    this.rowsButtons = rowsButtons;
  }

  init(lang) {
    this.keyBase = lang;
    console.log(this.keyBase);
    return this;
  }

  generatePage() {
    console.log(this.rowsButtons);
  }
}
