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
    gameState.subscribeOnLivesChanged(this.onLivesChanged.bind(this));

    this.renderGameStatusView = this.renderGameStatusView.bind(this);
  }

  /**
   * Функция инициализации блока статуса игры
   *
   * @param {number} lives Количество жизней игрока
   * @param {number} time Время игры
   */
  init({lives, time}) {
    this._view.init({lives, time});
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
   * Колбэк обработки изменения количества жизней игрока
   *
   * @param {number} lives Количество жизней игрока
   */
  onLivesChanged(lives) {
    this._view.updateLives(lives);
  }

  /**
   * Колбэк отрисовки вью в родителе
   *
   * @return {HTMLElement} Элемент блока статуса игры
   */
  renderGameStatusView() {
    return this._view.element;
  }
}
