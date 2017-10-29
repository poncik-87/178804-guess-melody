import renderPage from '../../utils/renderPage';
import ResultLoosePageView from './ResultLoosePageView';
import App from '../../App';

/**
 * Страница результата проигрыша
 */
class ResultLoosePage {
  constructor() {
    this._view = new ResultLoosePageView();
  }

  /**
   * Функция инициализации страницы
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

export default new ResultLoosePage();
