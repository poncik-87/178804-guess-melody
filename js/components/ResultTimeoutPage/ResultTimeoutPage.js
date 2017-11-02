import renderPage from '../../utils/renderPage';
import ResultTimeoutPageView from './ResultTimeoutPageView';
import App from '../../App';
import getGameResultMessage from '../../utils/getGameResultMessage';

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
    this._view.init(getGameResultMessage({time: 0}));
    renderPage(this._view.element);

    this._view.onRestartClick = () => {
      App.startGame();
    };
  }
}

export default new ResultTimeoutPage();
