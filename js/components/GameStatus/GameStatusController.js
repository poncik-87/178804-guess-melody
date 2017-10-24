import GameStatusView from './GameStatusView';

/**
 * Класс контроллера для компонента статуса игры
 */
export default class GameStatusController {
  /**
   * @param {Object} gameState Состояние игры
   */
  constructor(gameState) {
    this._view = new GameStatusView(gameState);
  }

  /**
   * Функция возвращает элемент компонента
   *
   * @return {HTMLElement} Dom элемент, который создает вью
   */
  get element() {
    return this._view.element;
  }
}
