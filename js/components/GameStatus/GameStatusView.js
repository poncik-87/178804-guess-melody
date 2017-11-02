import AbstractView from '../../AbstractView';
import timeConverter from '../../utils/timeConverter';

/**
 * Функция возвращает шаблон блока времени игры
 *
 * @param {number} minutes Минуты
 * @param {number} seconds Секунды
 * @param {boolean} isWarningMode Признак режима предупреждения
 *
 * @return {string} Шаблон блока времени игры
 */
const timerTemplate = (minutes, seconds, isWarningMode) =>
  `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
     <circle
       cx="390" cy="390" r="370"
       class="timer-line"
       style="filter: url(../../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
     </circle>

     <div class="${isWarningMode ? `timer-value timer-value--finished` : `timer-value`}" xmlns="http://www.w3.org/1999/xhtml">
       <span class="timer-value-mins">${minutes}</span>
       <span class="timer-value-dots">:</span>
       <span class="timer-value-secs">${seconds}</span>
     </div>
   </svg>`;

/**
 * Функция возвращает шаблон блока ошибок игрока
 *
 * @param {number} faults Количество ошибок игрока
 *
 * @return {string} Шаблон блока ошибок игрока
 */
const faultsTemplate = (faults) =>
  `<div class="main-mistakes">
     ${new Array(faults)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
   </div>`;

/**
 * Класс вью для компонента статуса игры
 */
export default class GameStatusView extends AbstractView {
  /**
   * @inheritdoc
   */
  get template() {
    const timeObject = timeConverter.numberToTime(this._time);
    return (
      `<div>
         ${timerTemplate(timeObject.minutes, timeObject.seconds, this._isWarningMode)}
         ${faultsTemplate(this._faults)}
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
    this._isWarninMode = isWarninMode;
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
}
