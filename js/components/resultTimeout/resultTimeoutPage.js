import renderPage from '../../utils/renderPage';
import welcomePage from '../welcome/welcomePage';
import ResultTimeoutView from './ResultTimeoutView';

/**
 * Функция возвращает страницу результата - время вышло
 *
 * @param {string} resultMessage Сообщение с результатом
 *
 * @return {HTMLElement} Страница результата
 */
const resultTimeoutPage = (resultMessage) => {
  const view = new ResultTimeoutView(resultMessage);
  view.onRestartClick = () => {
    renderPage(welcomePage());
  };

  return view.element;
};

export default resultTimeoutPage;
