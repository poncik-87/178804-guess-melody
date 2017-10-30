import renderPage from '../../utils/renderPage';
import ResultTimeoutPageView from './ResultTimeoutPageView';
import App from '../../App';

/**
 * Страница результата истекшего времени
 */
class ResultTimeoutPage {
  constructor() {
    this._view = new ResultTimeoutPageView();
  }

  /**
   * Функция инициализации экрана
   *
   * @param {string} resultMessage Сообщение с результатом
   */
  init(resultMessage) {
    this._view.init(resultMessage);
    renderPage(this._view.element);

    this._view.onRestartClick = () => {
      App.showWelcomePage();
    };
  }
}

export default new ResultTimeoutPage();
