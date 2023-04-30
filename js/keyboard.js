import createEl from './create-el.js';

const MSG_EN = '<kbd>Alt</kbd> + <kbd>Shift</kbd> to switch language';
const MSG_RU = 'Для смены языка используйте Alt+Shift';
const MSGS = [MSG_EN, MSG_RU];

const main = createEl('main', 'main', [createEl('h1', 'title', 'virtual-keyboard')]);

const footer = createEl('footer', 'footer', [createEl('h3', 'title', 'Virtual keyboard for Windows'),
  createEl('p', 'title-lang', MSGS[1])]);

export default class Keyboard {
  constructor(rowsButtons) {
    this.rowsButtons = rowsButtons;
  }

  init(lang) {
    this.keyBase = lang;
    this.output = createEl(
      'textarea',
      'output',
      null,
      main,
      ['placeholder', 'enter text'],
      ['rows', 7],
      ['cols', 40],
      ['spellcheck', false],
      ['autocorrect', 'off'],
    );
    console.log(555);
    this.container = createEl('div', 'keyboard', null, main, ['lang', lang]);
    document.body.prepend(footer);
    document.body.prepend(main);
    console.log(this.keyBase);

    return this;
  }

  /*  generatePage() {
   } */
}
