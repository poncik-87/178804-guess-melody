import renderPage from '../../utils/renderPage';
import welcomePage from '../welcome/welcomePage';
import ResultLooseView from './ResultLooseView';

/**
 * Функция возвращает страницу результата - проигрыш
 *
 * @param {string} resultMessage Сообщение с результатом
 *
 * @return {HTMLElement} Страница результата
 */
const resultLoosePage = (resultMessage) => {
  const view = new ResultLooseView(resultMessage);
  view.onRestartClick = () => {
    renderPage(welcomePage());
  };

  return view.element;
};

export default resultLoosePage;
