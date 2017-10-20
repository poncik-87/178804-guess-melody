import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderPage from '../utils/renderPage';
import welcomePage from './welcomePage';

/**
 * Функция возвращает шаблон страницы результата
 *
 * @param {string} resultMessage Сообщение с результатом
  *
 * @return {string} шаблон блока страницы
 */
const template = (resultMessage) =>
  `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">${resultMessage}</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

/**
 * Функция возвращает страницу результата - проигрыш
 *
 * @param {string} resultMessage Сообщение с результатом
 *
 * @return {HTMLElement} Страница результата
 */
const resultLoosePage = (resultMessage) => {
  const loosePageNode = getElementFromTemplate(template(resultMessage));

  const restartButton = loosePageNode.querySelector(`.main-replay`);
  restartButton.addEventListener(`click`, () => {
    renderPage(welcomePage());
  });

  return loosePageNode;
};

export default resultLoosePage;
