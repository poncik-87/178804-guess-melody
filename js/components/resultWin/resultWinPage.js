import renderPage from '../../utils/renderPage';
import welcomePage from '../welcome/welcomePage';
import ResultWinView from './ResultWinView';

/**
 * Функция возвращает страницу выигрышного результата
 *
 * @param {Object} userScore Счет игрока
 * @param {string} resultMessage Сообщение с результатом
 * @param {Object} gameState Состояние игры
 *
 * @return {HTMLElement} Страница результата
 */
const resultWinPage = (userScore, resultMessage, gameState) => {
  const view = new ResultWinView(userScore, resultMessage, gameState);
  view.onRestartClick = () => {
    renderPage(welcomePage());
  };

  return view.element;
};

export default resultWinPage;
