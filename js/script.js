/* eslint-disable import/extensions */
import * as language from './en-ru.js';
import Keyboard from './keyboard.js';
import * as storage from './storage.js';

const lang = storage.getStorage('keyboardLanguage', '"en"');
new Keyboard(language.rowsButtons).init(lang).generatePage();
