import AudioControlView from './AudioControlView';

/**
 * Контрола аудио
 */
export default class AudioControl {
  /**
   * @param {string} src Url аудиозаписи
   * @param {boolean} isAutoplay Нужно ли автоматически начинать воспроизведение
   */
  constructor({src, isAutoplay}) {
    this._view = new AudioControlView(src, isAutoplay);

    this._view.onPlayClicked = this._onPlayClicked.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  /**
   * @return {boolean} Признак того, играет ли в данный момент песня
   */
  get isPlaying() {
    return this._view.isPlaying;
  }

  /**
   * Колбэк отрисовки вью в родителе
   *
   * @return {HTMLElement} Элемент контрола
   */
  renderView() {
    return this._view.element;
  }

  /**
   * Удаление компонента из dom
   */
  remove() {
    this._view.element.parentNode.removeChild(this._view.element);
  }

  /**
   * Начать воспроизведение песни
   */
  play() {
    this._view.play();
  }

  /**
   * Поставить воспроизведение песни на паузу
   */
  pause() {
    this._view.pause();
  }

  /**
   * Обработчик нажатия на кнопку воспроизведения песни
   * @private
   */
  _onPlayClicked() {
    // если родитель не назначил обработчик onPlayClicked, то обрабатываем дефолтное поведение
    if (this.onPlayClicked) {
      this.onPlayClicked();
    } else {
      this._view.togglePlay();
    }
  }

}
