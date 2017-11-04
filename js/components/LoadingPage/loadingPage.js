import LoadingPageView from './LoadingPageView';
import renderMainView from "../../utils/renderMainView";

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
