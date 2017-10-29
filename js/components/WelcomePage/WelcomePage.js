import WelcomePageView from './WelcomePageView';
import renderPage from "../../utils/renderPage";
import routeToNextPage from '../../utils/routeToNextPage';
import GameState from '../../data/GameState';

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
      routeToNextPage(GameState.generate());
    };
  }
}

export default new WelcomePage();
