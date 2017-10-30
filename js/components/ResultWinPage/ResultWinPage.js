import renderPage from '../../utils/renderPage';
import ResultWinPageView from './ResultWinPageView';
import App from '../../App';

/**
 * Страница с результатом выигрыша
 */
class ResultWinPage {
  constructor() {
    this._view = new ResultWinPageView();
  }

  /**
   * Функция инициализации страницы
   *
   * @param {number} lives Количество жизней игрока
   * @param {number} time Оставшееся время игры
   * @param {Object} userScore Счет игрока
   * @param {string} resultMessage Сообщение результата игры
   */
  init({lives, time, userScore, resultMessage}) {
    this._view.init({lives, time, userScore, resultMessage});
    renderPage(this._view.element);

    this._view.onRestartClick = () => {
      App.showWelcomePage();
    };
  }
}

export default new ResultWinPage();
