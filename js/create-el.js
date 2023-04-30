export default function createEl(tag, classNames, child, parent, ...dataAttr) {
  let element = null;
  try {
    element = document.createElement(tag);
  } catch (error) { // catch errors if element cant be create
    throw new Error('Unable to create HTMLElement! Give a proper tag name');
  }
  if (classNames) element.classList.add(...classNames.split(' '));
  if (child && Array.isArray(child)) child.forEach((chEl) => chEl && element.appendChild(chEl));
  else if (child && typeof child === 'object') element.appendChild(child);
  else if (child && typeof child === 'string') element.innerHTML = child;
  if (parent) parent.appendChild(element);
  if (dataAttr.length) {
    dataAttr.forEach(([attName, attValue]) => {
      if (attValue === '') element.setAttribute(attName, '');
      if (attName.match(/value|id|placeholder|cols|rows|autocorrect|spellcheck/)) {
        element.setAttribute(attName, attValue);
      } else {
        element.dataset[attName] = attValue;
      }
    });
  }
  return element;
}
