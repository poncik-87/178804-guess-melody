/**
 * Конвертирует разметку из строки в DOM элемент
 *
 * @param {string} markupString Разметка в формате строки
 * @return {HTMLElement} DOM элемент
 */
export default function (markupString) {
  const tmpNode = document.createElement(`div`);
  tmpNode.innerHTML = markupString;
  return tmpNode.firstChild;
}
