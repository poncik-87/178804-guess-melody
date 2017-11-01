import AudioControlView from './AudioControlView';

/**
 * Контрола аудио
 */
export default class AudioControl {
  /**
   * @param {string} src Url аудиозаписи
   */
  constructor(src) {
    this._view = new AudioControlView(src);

    this.renderView = this.renderView.bind(this);
  }

  /**
   * Колбэк отрисовки вью в родителе
   *
   * @return {HTMLElement} Элемент контрола
   */
  renderView() {
    return this._view.element;
  }
}
