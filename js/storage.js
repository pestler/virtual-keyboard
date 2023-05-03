export function setStorage(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function getStorage(name, val = null) {
  return JSON.parse(window.localStorage.getItem(name) || val);
}
