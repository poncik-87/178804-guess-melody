import AbstractView from '../../AbstractView';
import getMistakesCount from '../../utils/getMistakesCount';
import timeConverter from '../../utils/timeConverter';

/**
 * Вью экрана выигрыша
 */
export default class ResultWinPageView extends AbstractView {
  /**
   * Функция инициализации вью
   *
   * @param {number} lives Количество жизней игрока
   * @param {number} time Оставшееся время игры
   * @param {Object} userScore Счет игрока
   * @param {string} resultMessage Сообщение результата игры
   */
  init({lives, time, userScore, resultMessage}) {
    this._lives = lives;
    this._time = time;
    this._userScore = userScore;
    this._resultMessage = resultMessage;

    this.clearElement();
  }

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
           <br>вы&nbsp;набрали ${this._userScore.totalScore} баллов (${this._userScore.fastAnswersScore} быстрых)
           <br>совершив ${getMistakesCount(this._lives)} ошибки</div>
         <span class="main-comparison">${this._resultMessage}</span>
         <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
       </section>`
    );
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
