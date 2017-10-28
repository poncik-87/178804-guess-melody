import AbstractView from '../../AbstractView';

/**
 * Класс вью для игрового экрана проигрыша
 */
export default class ResultLooseView extends AbstractView {
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

         <h2 class="title">Какая жалость!</h2>
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
