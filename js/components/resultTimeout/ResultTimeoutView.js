import AbstractView from '../../AbstractView';

/**
 * Класс вью для игрового экрана закончившегося времени
 */
export default class ResultTimeoutView extends AbstractView {
  /**
   * @param {string} resultMessage Сообщение с результатом
   */
  constructor(resultMessage) {
    super();

    this._resultMessage = resultMessage;
  }

  /**
   * @inheritdoc
   */
  get template() {
    return (
      `<section class="main main--result">
         <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

         <h2 class="title">Увы и ах!</h2>
         <div class="main-stat">${this._resultMessage}</div>
         <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
       </section>`
    );
  }

  /**
   * @inheritdoc
   */
  bind() {
    const restartButtonNode = this.element.querySelector(`.main-replay`);
    restartButtonNode.addEventListener(`click`, () => {
      this.onRestartClick();
    });
  }

  /**
   * Колбэк нажатия на кнопку рестарта
   */
  onRestartClick() {
  }
}
