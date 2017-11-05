import AbstractView from '../../abstract-view';

/**
 * Вью экрана загрузки
 */
export default class LoadingPageView extends AbstractView {
  /**
   * @inheritdoc
   */
  get template() {
    return (
      `<section class="main">
         <h2 class="title main-title">Загрузка...</h2>
      </section>`
    );
  }
}
