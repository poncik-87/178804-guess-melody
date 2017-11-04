import renderMainView from '../../utils/renderMainView';
import ResultLoosePageView from './ResultLoosePageView';
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
