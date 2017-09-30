const FIRST_PAGE_INDEX = 0;

const templateNode = document.getElementById(`templates`);
if (`content` in templateNode) {
  const pageTemplateNodes = [...templateNode.content.querySelectorAll(`section.main`)];

  const mainNode = document.querySelector(`.app .main`);
  if (mainNode) {
    let currentIndex = changePage(mainNode, pageTemplateNodes, FIRST_PAGE_INDEX);

    document.addEventListener(`keydown`, (event) => {
      if (!event.altKey) {
        return;
      }

      const keyName = event.key;
      if (keyName === `ArrowLeft`) {
        currentIndex = changePage(mainNode, pageTemplateNodes, currentIndex - 1, currentIndex);
      } else if (keyName === `ArrowRight`) {
        currentIndex = changePage(mainNode, pageTemplateNodes, currentIndex + 1, currentIndex);
      }
    });
  }
}

/**
 * Возвращает страницу по индексу экрана
 *
 * @param {HTMLElement[]} pageList Список страниц
 * @param {number} index Индекс требуемой страницы
 * @return {HTMLElement} Страница, соответствующая индексу из массива
 */
function getPage(pageList, index) {
  const pageOrder = [
    `main--welcome`,
    `main--level`,
    `main--result`,
  ];

  let page;
  if (index >= 0 || index < pageOrder.length) {
    page = pageList.find((it) => it.classList.contains(pageOrder[index]));
  }
  return page;
}

/**
 * Изменяет текущую страницу в DOM
 *
 * @param {HTMLElement} mainNode Родительский узел
 * @param {HTMLElement[]} pageTemplateNodes Список шаблонов страниц
 * @param {number} nextIndex Индекс следующей страницы
 * @param {number} currentIndex Индекс текущей страницы
 * @return {number} Индекс новой текущей страницы
 */
function changePage(mainNode, pageTemplateNodes, nextIndex, currentIndex) {
  const nextPageTemplateNode = getPage(pageTemplateNodes, nextIndex);

  if (!nextPageTemplateNode) {
    return currentIndex;
  }

  if (mainNode.children.length > 0) {
    mainNode.removeChild(mainNode.lastChild);
  }
  mainNode.appendChild(document.importNode(nextPageTemplateNode, true));

  return nextIndex;
}
