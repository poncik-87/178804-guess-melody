import renderPage from '../../utils/renderPage';
import ResultWinPageView from './ResultWinPageView';
import app from '../../app';
import getGameResultMessage from '../../utils/getGameResultMessage';

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
   * @param {number} faults Количество ошибок игрока
   * @param {number} time Оставшееся время игры
   * @param {number} totalScore Общий счет игрока
   * @param {number} fastAnswersScore Счет быстрых ответов
   * @param {Array<Object>} statsData Статистика прохождения игры
   */
  init({faults, time, totalScore, fastAnswersScore, statsData}) {
    const resultMessage = getGameResultMessage({
      score: totalScore,
      faults,
      time
    }, statsData);

    this._view.init({faults, time, totalScore, fastAnswersScore, resultMessage});
    renderPage(this._view.element);

    this._view.onRestartClick = () => {
      app.startGame();
    };
  }
}

export default new ResultWinPage();
