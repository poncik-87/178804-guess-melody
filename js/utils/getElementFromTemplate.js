/**
 * Конвертирует разметку из строки в DOM элемент
 *
 * @param {string} template Разметка в формате строки
 * @return {HTMLElement} DOM элемент
 */
export default function (template) {
  const tmpNode = document.createElement(`div`);
  tmpNode.innerHTML = template;
  return tmpNode.firstChild;
}
