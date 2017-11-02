import GameStatusView from './GameStatusView';

/**
 * Блок статуса игры
 */
export default class GameStatus {
  /**
   * @param {GameState} gameState Состояние игры
   */
  constructor(gameState) {
    this._view = new GameStatusView();

    gameState.subscribeOnTimeChanged(this.onTimeChanged.bind(this));
    gameState.subscribeOnFaultsChanged(this.onFaultsChanged.bind(this));

    this.renderView = this.renderView.bind(this);
  }

  /**
   * Функция инициализации блока статуса игры
   *
   * @param {number} faults Количество ошибок игрока
   * @param {number} time Время игры
   */
  init({faults, time}) {
    this._view.init({faults, time});
  }

  /**
   * Колбэк отрисовки вью в родителе
   *
   * @return {HTMLElement} Элемент блока статуса игры
   */
  renderView() {
    return this._view.element;
  }

  /**
   * Колбэк обработки изменения оставшегося времени игры
   *
   * @param {number} time Оставшееся время игры
   */
  onTimeChanged(time) {
    this._view.updateTime(time);
  }

  /**
   * Колбэк обработки изменения количества ошибок игрока
   *
   * @param {number} faults Количество ошибок игрока
   */
  onFaultsChanged(faults) {
    this._view.updateFaults(faults);
  }
}
