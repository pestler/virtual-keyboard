import createEl from "./create-el.js";

export default class Keys {
  constructor({ small, large, code }) {
    this.small = small;
    this.large = large;
    this.code = code;
    this.darkButtons = Boolean(small.match(/Caps|Ctrl|Alt|Shift|Tab|Win|Back|Del|Enter|arr/));

    if (large && large.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
      this.topSymbol = createEl('div', 'topSymbol', this.large);
    } else {
      this.topSymbol = createEl('div', 'topSymbol', '');
    }

    this.symbol = createEl('div', 'symbol', this.small);
    this.div = createEl(
      'div',
      'keyboard__button',
      [this.topSymbol, this.symbol],
      null,
      ['code', this.code],
      this.darkButtons ? ['darkbutton', 'true'] : ['darkbutton', 'false'],
    );
  }
}
