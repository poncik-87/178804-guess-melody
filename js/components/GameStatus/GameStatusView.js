import AbstractView from '../../AbstractView';
import timeConverter from '../../utils/timeConverter';

/**
 * Функция возвращает шаблон блока времени игры
 *
 * @param {number} minutes Минуты
 * @param {number} seconds Секунды
 *
 * @return {string} Шаблон блока времени игры
 */
const timerTemplate = ({minutes, seconds}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
     <circle
       cx="390" cy="390" r="370"
       class="timer-line"
       style="filter: url(../../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
     </circle>

     <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
       <span class="timer-value-mins">${minutes}</span>
       <span class="timer-value-dots">:</span>
       <span class="timer-value-secs">${seconds}</span>
     </div>
   </svg>`;

/**
 * Функция возвращает шаблон блока жизней игрока
 *
 * @param {number} lives Количество жизней игрока
 *
 * @return {string} Шаблон блока жизней игрока
 */
const livesTemplate = (lives) =>
  `<div class="main-mistakes">
     ${new Array(lives)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
   </div>`;

/**
 * Класс вью для компонента статуса игры
 */
export default class GameStatusView extends AbstractView {
  /**
   * @param {number} lives Количество жизней игрока
   * @param {number} time Время игры
   */
  constructor({lives, time}) {
    super();

    this._lives = lives;
    this._time = time;
  }

  /**
   * Функция обновляет отображение вью
   *
   * @param {number} lives Количество жизней игрока
   * @param {number} time Время игры
   */
  update({lives, time}) {
    this._lives = lives;
    this._time = time;

    super.update();
  }

  /**
   * @inheritdoc
   */
  get template() {
    return (
      `<div>
         ${timerTemplate(timeConverter.numberToTime(this._time))}
         ${livesTemplate(this._lives)}
       </div>`
    );
  }
}
