import renderPage from '../../utils/renderPage';
import welcomePage from '../welcome/welcomePage';
import ResultWinView from './ResultWinView';

/**
 * Функция возвращает страницу выигрышного результата
 *
 * @param {GameState} gameState Состояние игры
 * @param {Object} userScore Счет игрока
 * @param {string} resultMessage Сообщение с результатом
 *
 *
 * @return {HTMLElement} Страница результата
 */
const resultWinPage = (gameState, userScore, resultMessage) => {
  const view = new ResultWinView(gameState, userScore, resultMessage);
  view.onRestartClick = () => {
    renderPage(welcomePage());
  };

  return view.element;
};

export default resultWinPage;
