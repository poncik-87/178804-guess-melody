const mainNode = document.querySelector(`.app .main`);

/**
 * Отрисовывает DOM элемент на странице
 *
 * @param {HTMLElement} domNode DOM элемент, который необходимо отрисовать на странице
 */
export default function (domNode) {
  if (!mainNode) {
    return;
  }

  if (mainNode.children.length > 0) {
    mainNode.removeChild(mainNode.lastChild);
  }
  mainNode.appendChild(domNode);
}
