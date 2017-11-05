import renderMainView from '../../utils/render-main-view';
import ResultLoosePageView from './result-loose-page-view';
import app from '../../app';

/**
 * Страница результата проигрыша
 */
class ResultLoosePage {
  constructor() {
    this._view = new ResultLoosePageView();
  }

  /**
   * Функция инициализации страницы
   */
  init() {
    this._view.init();
    renderMainView(this._view);

    this._view.onRestartClick = function () {
      app.startGame();
    };
  }
}

export default new ResultLoosePage();
