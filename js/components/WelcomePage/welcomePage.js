import WelcomePageView from './WelcomePageView';
import renderPage from "../../utils/renderPage";
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
    renderPage(this._view.element);

    this._view.onStartClick = () => {
      app.startGame();
    };
  }
}

export default new WelcomePage();
