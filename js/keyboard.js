import createEl from './create-el.js';
import { language } from './en-ru.js';
import Keys from './keys.js';

const MSG_EN = 'Alt + Shift to switch language';
const MSG_RU = 'Для смены языка используйте Alt+Shift';
const MSGS = [MSG_EN, MSG_RU];

const main = createEl('main', 'main', [createEl('h1', 'title', 'virtual-keyboard')]);

const footer = createEl('footer', 'footer', [createEl('h3', 'title', 'Virtual keyboard for Windows'),
  createEl('p', 'title-lang', MSGS[0])]);

export default class Keyboard {
  constructor(rowsButtons) {
    this.rowsButtons = rowsButtons;
  }

  init(lang) {
    this.keyBase = language[lang];
    this.output = createEl(
      'textarea',
      'textarea',
      null,
      main,
      ['placeholder', 'enter text'],
      ['rows', 12],
      ['cols', 40],
      ['spellcheck', false],
      ['autocorrect', 'off'],
    );
    console.log(555);
    this.container = createEl('section', 'keyboard-container', null, main, ['language', lang]);
    document.body.prepend(footer);
    document.body.prepend(main);
    return this;
  }

  generatePage() {
    this.keyButtons = [];
    this.rowsButtons.forEach((elRows, ind) => {
      const rowsButtonsKeys = createEl('div', 'keyboard-rows__button', null, this.container, ['row', ind + 1]);
      rowsButtonsKeys.style.gridTemplateColumns = `repeat(${elRows.length}, 1fr)`;
      elRows.forEach((codeBut) => {
        const keyObj = this.keyBase.find((key) => key.code === codeBut);
        if (keyObj) {
          const keyButton = new Keys(keyObj);
          this.keyButtons.push(keyButton);
          rowsButtonsKeys.appendChild(keyButton.div);
        }
      });
    });
  }
}
