import { language, rowsButtons } from './en-ru.js';
import Keyboard from './keyboard.js';
import { set, get } from "./storage.js";
const lang = 'en';
new Keyboard(rowsButtons).init(lang)//.generatePage();
