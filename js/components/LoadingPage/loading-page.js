import LoadingPageView from './loading-page-view';
import renderMainView from "../../utils/render-main-view";

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
    renderMainView(this._view);
  }
}

export default new LoadingPage();
