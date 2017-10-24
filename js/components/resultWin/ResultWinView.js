import AbstractView from '../../AbstractView';
import getMistakesCount from '../../utils/getMistakesCount';

/**
 * Класс вью для игрового экрана выигрыша
 */
export default class ResultWinView extends AbstractView {
  /**
   *
   * @param {Object} userScore Счет игрока
   * @param {string} resultMessage Сообщение с результатом
   * @param {Object} gameState Состояние игры
   */
  constructor(userScore, resultMessage, gameState) {
    super();

    this._userScore = userScore;
    this._resultMessage = resultMessage;
    this._gameState = gameState;
  }

  /**
   * @inheritdoc
   */
  get template() {
    return (
      `<section class="main main--result">
         <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

         <h2 class="title">Вы настоящий меломан!</h2>
         <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
           <br>вы&nbsp;набрали ${this._userScore.totalScore} баллов (${this._userScore.fastAnswersScore} быстрых)
           <br>совершив ${getMistakesCount(this.gameState.lives)} ошибки</div>
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
