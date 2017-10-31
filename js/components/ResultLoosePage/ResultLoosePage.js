import renderPage from '../../utils/renderPage';
import ResultLoosePageView from './ResultLoosePageView';
import App from '../../App';
import getGameResultMessage from '../../utils/getGameResultMessage';

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
    this._view.init(getGameResultMessage({lives: 0}));
    renderPage(this._view.element);

    this._view.onRestartClick = () => {
      App.showWelcomePage();
    };
  }
}

export default new ResultLoosePage();
