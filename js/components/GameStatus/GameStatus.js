import GameStatusView from './GameStatusView';

/**
 * Время, после которого включается режим предупреждения об окончании времени
 */
const WARNING_TIME = 30;

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
  }

  /**
   * @return {AbstractView} Вью блока статуса игры
   */
  get view() {
    return this._view;
  }

  /**
   * Функция инициализации блока статуса игры
   *
   * @param {number} faults Количество ошибок игрока
   * @param {number} time Время игры
   */
  init({faults, time}) {
    this._view.init({faults, time, isWarninMode: GameStatus._isWarningMode(time)});
  }

  /**
   * Колбэк обработки изменения оставшегося времени игры
   *
   * @param {number} time Оставшееся время игры
   */
  onTimeChanged(time) {
    this._view.updateTime(time, GameStatus._isWarningMode(time));
  }

  /**
   * Колбэк обработки изменения количества ошибок игрока
   *
   * @param {number} faults Количество ошибок игрока
   */
  onFaultsChanged(faults) {
    this._view.updateFaults(faults);
  }

  /**
   * Функция возвращает признак режима предупреждения
   *
   * @param {number} time Оставшееся время
   * @return {boolean} Признак режима предупреждения
   * @private
   */
  static _isWarningMode(time) {
    return time < WARNING_TIME;
  }
}
