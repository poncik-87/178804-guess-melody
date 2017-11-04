import AbstractView from '../../AbstractView';
import timeConverter from '../../utils/timeConverter';
import getGameResultMessage from '../../utils/getGameResultMessage';

/**
 * Вью экрана выигрыша
 */
export default class ResultWinPageView extends AbstractView {
  /**
   * @inheritdoc
   */
  get template() {
    const {minutes, seconds} = timeConverter.numberToTime(this._time);
    return (
      `<section class="main main--result">
         <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

         <h2 class="title">Вы настоящий меломан!</h2>
         <div class="main-stat">За&nbsp;${minutes}&nbsp;${ResultWinPageView._minutesDeclension(minutes)} и ${seconds}&nbsp;${ResultWinPageView._secondsDeclension(seconds)}
           <br>вы&nbsp;набрали ${this._totalScore} баллов (${this._fastAnswersScore} быстрых)
           <br>совершив ${this._faults} ошибки</div>
         <span class="main-comparison">${this._resultMessage}</span>
         <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
       </section>`
    );
  }

  /**
   * Функция инициализации вью
   *
   * @param {number} faults Количество ошибок игрока
   * @param {number} time Оставшееся время игры
   * @param {number} totalScore Общий счет игрока
   * @param {number} fastAnswersScore Счет быстрых ответов
   * @param {Array<Object>} statsData Статистика прохождения игры
   */
  init({faults, time, totalScore, fastAnswersScore, statsData}) {
    this._faults = faults;
    this._time = time;
    this._totalScore = totalScore;
    this._fastAnswersScore = fastAnswersScore;
    this._resultMessage = getGameResultMessage({
      score: totalScore,
      faults,
      time
    }, statsData);

    this.clearElement();
  }

  /**
   * @inheritdoc
   */
  bind() {
    const restartButton = this.element.querySelector(`.main-replay`);
    restartButton.addEventListener(`click`, () => {
      this.onRestartClick();
    });
  }

  /**
   * Функция возвращает склонение слова "минута" в родительном падеже в зависимости от числительного
   *
   * @param {number} minutes Количество минут
   * @return {string} Строка склоненного слова
   * @private
   */
  static _minutesDeclension(minutes) {
    let word;
    if (minutes === 1) {
      word = `минуту`;
    } else if (minutes < 5) {
      word = `минуты`;
    } else {
      word = `минут`;
    }
    return word;
  }

  /**
   * Функция возвращает склонение слова "секунда" в родительном падеже в зависимости от числительного
   *
   * @param {number} seconds Количество секунд
   * @return {string} Строка склоненного слова
   * @private
   */
  static _secondsDeclension(seconds) {
    const lastFigure = seconds % 10;
    let word;
    if (lastFigure === 1) {
      word = `секунду`;
    } else if (lastFigure < 5) {
      word = `секунды`;
    } else {
      word = `секунд`;
    }
    return word;
  }

  /**
   * Колбэк нажатия на кнопку рестарта
   */
  onRestartClick() {
  }
}
