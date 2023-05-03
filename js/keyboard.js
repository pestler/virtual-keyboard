/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import createEl from './create-el.js';
import { language } from './en-ru.js';
import Keys from './keys.js';
import * as storage from './storage.js';

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
    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('keyup', this.handleEvent);
    this.container.onmousedown = this.mouseHandleEvent;
    this.container.onmouseup = this.mouseHandleEvent;
  }

  handleEvent = (event) => {
    event.stopPropagation();
    const { code, type } = event;
    const objKey = this.keyButtons.find((key) => key.code === code);
    if (!objKey) return;
    this.output.focus();
    objKey.div.classList.toggle('active');
    if (type.match(/keydown|mousedown/)) {
      if (code.match(/Alt/)) this.altKey = true;
      if (code.match(/Shift/)) this.shiftKey = true;
      if (code.match(/Alt/) && this.shiftKey) this.changeLanguage();
    }
  };

  // eslint-disable-next-line class-methods-use-this
  mouseHandleEvent(event) {
    if (event.stopPropagation) event.stopPropagation();
  }

  changeLanguage = () => {
    const langButton = Object.keys(language);
    let langInd = langButton.indexOf(this.container.dataset.language);
    this.keyBase = langInd + 1 < langButton.length
      ? language[langButton[langInd += 1]]
      : language[langButton[langInd -= 1]];
    this.container.dataset.language = langButton[langInd];
    storage.setStorage('keyboardLanguage', langButton[langInd]);   
    this.keyButtons.forEach((but) => {
      const objKey = this.keyBase.find((key) => key.code === but.code);
      if (!objKey) return;
      but.large = objKey.large;
      but.small = objKey.small;
      if (objKey.large && objKey.large.match((/[a-zA-Zа-яёЁ]/g))) {
        but.symbol.innerHTML = objKey.large;
      } else {
        but.symbol.innerHTML = '';
      }
      but.symbol.innerHTML = objKey.small;
    });
    footer.lastChild.innerHTML = MSGS[langInd];
  };
}
