import AbstractView from '../../AbstractView';
import timeConverter from '../../utils/timeConverter';

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
         <div class="main-stat">За&nbsp;${minutes}&nbsp;минуты и ${seconds}&nbsp;секунд
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
   * @param {string} resultMessage Сообщение результата игры
   */
  init({faults, time, totalScore, fastAnswersScore, resultMessage}) {
    this._faults = faults;
    this._time = time;
    this._totalScore = totalScore;
    this._fastAnswersScore = fastAnswersScore;
    this._resultMessage = resultMessage;

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
   * Колбэк нажатия на кнопку рестарта
   */
  onRestartClick() {
  }
}
