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
  }

  /**
   * Функция возвращает элемент компонента
   *
   * @return {HTMLElement} Dom элемент, который создает вью
   */
  get element() {
    return this._view.element;
  }
}
