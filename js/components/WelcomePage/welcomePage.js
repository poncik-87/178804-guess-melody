import WelcomePageView from './WelcomePageView';
import renderMainView from "../../utils/renderMainView";
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
