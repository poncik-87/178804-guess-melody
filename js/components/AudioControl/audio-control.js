import AudioControlView from './audio-control-view';

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
  }

  /**
   * @return {boolean} Признак того, играет ли в данный момент песня
   */
  get isPlaying() {
    return this._isPlaying;
  }

  /**
   * @return {AbstractView} Вью контрола
   */
  get view() {
    return this._view;
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
    this._isPlaying = true;
    this._onPlayStatusChanged();
  }

  /**
   * Поставить воспроизведение песни на паузу
   */
  pause() {
    this._isPlaying = false;
    this._onPlayStatusChanged();
  }

  /**
   * Сменить режим воспроизведения
   */
  togglePlay() {
    this._isPlaying = !this._isPlaying;
    this._onPlayStatusChanged();
  }

  /**
   * Обработчик изменения режима воспроизведения
   *
   * @private
   */
  _onPlayStatusChanged() {
    if (this.view.element) {
      if (this._isPlaying) {
        this._view.play();
      } else {
        this._view.pause();
      }
    }
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
      this.togglePlay();
    }
  }
}
