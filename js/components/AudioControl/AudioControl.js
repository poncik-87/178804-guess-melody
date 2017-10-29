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

    this.renderAudioControlView = this.renderAudioControlView.bind(this);
  }

  /**
   * Колбэк отрисовки вью в родителе
   *
   * @return {HTMLElement} Элемент контрола
   */
  renderAudioControlView() {
    return this._view.element;
  }
}
