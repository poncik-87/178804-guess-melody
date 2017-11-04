const mainNode = document.querySelector(`.app .main`);

/**
 * Отрисовывает вью страницы игры
 *
 * @param {AbstractView} view Вью страницы игры
 * @param {HTMLElement} view.element DOM элемент вью
 */
export default function renderMainView(view) {
  if (!mainNode) {
    return;
  }

  if (mainNode.children.length > 0) {
    mainNode.removeChild(mainNode.lastChild);
  }
  mainNode.appendChild(view.element);
}
