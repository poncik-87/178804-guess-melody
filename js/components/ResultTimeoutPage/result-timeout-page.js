import renderMainView from '../../utils/render-main-view';
import ResultTimeoutPageView from './result-timeout-page-view';
import app from '../../app';

/**
 * Страница результата истекшего времени
 */
class ResultTimeoutPage {
  constructor() {
    this._view = new ResultTimeoutPageView();
  }

  /**
   * Функция инициализации экрана
   */
  init() {
    this._view.init();
    renderMainView(this._view);

    this._view.onRestartClick = function () {
      app.startGame();
    };
  }
}

export default new ResultTimeoutPage();
