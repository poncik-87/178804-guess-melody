import renderMainView from '../../utils/render-main-view';
import ResultWinPageView from './result-win-page-view';
import app from '../../app';

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
    this._view.init({faults, time, totalScore, fastAnswersScore, statsData});
    renderMainView(this._view);

    this._view.onRestartClick = function () {
      app.startGame();
    };
  }
}

export default new ResultWinPage();
