import WelcomePageView from './welcome-page-view';
import renderMainView from "../../utils/render-main-view";
import app from '../../app';

/**
 * Страница приветствия
 */
class WelcomePage {
  constructor() {
    this._view = new WelcomePageView();
  }

  /**
   * Функция инициализации страницы
   */
  init() {
    renderMainView(this._view);

    this._view.onStartClick = function () {
      app.startGame();
    };
  }
}

export default new WelcomePage();
