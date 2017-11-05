import AbstractView from '../../abstract-view';
import getGameResultMessage from '../../utils/get-game-result-message';

/**
 * Вью страницы закончившегося времени
 */
export default class ResultTimeoutPageView extends AbstractView {
  /**
   * @inheritdoc
   */
  get template() {
    const resultMessage = getGameResultMessage({time: 0});
    return (
      `<section class="main main--result">
         <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

         <h2 class="title">Увы и ах!</h2>
         <div class="main-stat">${resultMessage}</div>
         <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
       </section>`
    );
  }

  /**
   * Функция инициализации вью
   */
  init() {
    this.clearElement();
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
