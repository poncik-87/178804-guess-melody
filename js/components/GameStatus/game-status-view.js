import AbstractView from '../../abstract-view';
import timeConverter from '../../utils/time-converter';

/**
 * Класс вью для компонента статуса игры
 */
export default class GameStatusView extends AbstractView {
  /**
   * @inheritdoc
   */
  get template() {

    return (
      `<div>
         ${this._timerTemplate()}
         ${this._faultsTemplate()}
       </div>`
    );
  }

  /**
   * Функция инициализации вью
   *
   * @param {number} faults Количество ошибок игрока
   * @param {number} time Время игры
   * @param {boolean} isWarningMode Признак режима предупреждения
   */
  init({faults, time, isWarninMode}) {
    this._faults = faults;
    this._time = time;
    this._isWarningMode = isWarninMode;
  }

  /**
   * Функция обновляет оставшееся время
   *
   * @param {number} time Время игры
   * @param {boolean} isWarningMode Признак режима предупреждения
   */
  updateTime(time, isWarningMode) {
    this._time = time;
    this._isWarningMode = isWarningMode;

    super.update();
  }

  /**
   * Функция обновляет количество ошибок игрока
   *
   * @param {number} faults Количество ошибок игрока
   */
  updateFaults(faults) {
    this._faults = faults;

    super.update();
  }

  /**
   * Функция возвращает шаблон блока времени игры
   *
   * @return {string} Шаблон блока времени игры
   */
  _timerTemplate() {
    const timeObject = timeConverter.numberToTime(this._time);
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
         <circle
           cx="390" cy="390" r="370"
           class="timer-line"
           style="filter: url(../../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
         </circle>
    
         <div class="${this._isWarningMode ? `timer-value timer-value--finished` : `timer-value`}" xmlns="http://www.w3.org/1999/xhtml">
           <span class="timer-value-mins">${timeObject.minutes}</span>
           <span class="timer-value-dots">:</span>
           <span class="timer-value-secs">${timeObject.seconds}</span>
         </div>
       </svg>`
    );
  }

  /**
   * Функция возвращает шаблон блока ошибок игрока
   *
   * @return {string} Шаблон блока ошибок игрока
   */
  _faultsTemplate() {
    return (
      `<div class="main-mistakes">
         ${new Array(this._faults)
          .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
          .join(``)}
       </div>`
    );
  }
}
