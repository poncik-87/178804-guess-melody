import {MAX_FAULTS_COUNT} from '../../consts';

import AbstractView from '../../AbstractView';

/**
 * Вью приветственного экрана
 */
export default class WelcomePageView extends AbstractView {
  /**
   * @inheritdoc
   */
  get template() {
    return (
      `<section class="main main--welcome">
         <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
         <button class="main-play">Начать игру</button>
         <h2 class="title main-title">Правила игры</h2>
         <p class="text main-text">
           Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
           Ошибиться можно ${MAX_FAULTS_COUNT} раза.<br>
           Удачи!
         </p>
      </section>`
    );
  }

  /**
   * @inheritdoc
   */
  bind() {
    const startPlayButton = this.element.querySelector(`.main-play`);
    startPlayButton.addEventListener(`click`, () => {
      this.onStartClick();
    });
  }

  /**
   * Колбэк обработки клика на кнопку старта игры
   */
  onStartClick() {
  }
}
