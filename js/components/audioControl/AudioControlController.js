import AudioControlView from './AudioControlView';

/**
 * Класс контроллера для контрола аудио
 */
export default class AudioControlController {
  /**
   * @param {string} src Url аудиозаписи
   */
  constructor(src) {
    this._view = new AudioControlView(src);

    this.renderAudioControlView = () => {
      return this._view.element;
    };
  }
}
