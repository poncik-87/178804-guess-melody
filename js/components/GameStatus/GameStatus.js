import GameStatusView from './GameStatusView';

/**
 * Блок статуса игры
 */
export default class GameStatus {
  /**
   * @param {number} lives Количество жизней игрока
   * @param {number} time Оставшееся время игры
   */
  constructor({lives, time}) {
    this._view = new GameStatusView({lives, time});

    this.renderGameStatusView = this.renderGameStatusView.bind(this);
  }

  /**
   * Колбэк отрисовки вью в родителе
   *
   * @return {HTMLElement} Элемент блока статуса игры
   */
  renderGameStatusView() {
    return this._view.element;
  }

  /**
   * Функция обновления отображения блока статуса игры
   *
   * @param {number} lives Количество жизней игрока
   * @param {number} time Оставшееся время игры
   */
  update({lives, time}) {
    this._view.update({lives, time});
  }
}
