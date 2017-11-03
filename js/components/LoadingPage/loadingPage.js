import LoadingPageView from './LoadingPageView';
import renderPage from "../../utils/renderPage";

/**
 * Страница загрузки
 */
class LoadingPage {
  constructor() {
    this._view = new LoadingPageView();
  }

  /**
   * Функция инициализации страницы
   */
  init() {
    renderPage(this._view.element);
  }
}

export default new LoadingPage();
