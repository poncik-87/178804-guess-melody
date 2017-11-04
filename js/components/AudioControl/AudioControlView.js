import AbstractView from '../../AbstractView';

/**
 * Класс вью для контрола аудио
 */
export default class AudioControlView extends AbstractView {
  /**
   * @param {string} src Url аудиозаписи
   * @param {boolean} isAutoplay Признак автоматичесого начала воспроизведения
   */
  constructor(src, isAutoplay) {
    super();

    this._src = src;
    this._isAutoplay = isAutoplay;
  }

  /**
   * @inheritdoc
   */
  get template() {
    return (
      `<div class="player-wrapper">
         <div class="player">
           <audio src="${this._src}" ${this._isAutoplay ? `autoplay` : ``}></audio>
           <button class="player-control ${this._isAutoplay ? `player-control--pause` : `player-control--play`}"></button>
           <div class="player-track">
             <span class="player-status"></span>
           </div>
         </div>
       </div>`
    );
  }

  /**
   * @inheritdoc
   */
  bind() {
    const audioControlButtonNode = this.element.querySelector(`.player-control`);
    this._audioNode = this.element.querySelector(`audio`);
    this._buttonClassNames = audioControlButtonNode.classList;

    audioControlButtonNode.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onPlayClicked();
    });
  }

  /**
   * Играть песню
   */
  play() {
    this._audioNode.play();
    this._buttonClassNames.add(`player-control--pause`);
    this._buttonClassNames.remove(`player-control--play`);
  }

  /**
   * Приостановить воспроизведение песни
   */
  pause() {
    this._audioNode.pause();
    this._buttonClassNames.remove(`player-control--pause`);
    this._buttonClassNames.add(`player-control--play`);
  }

  /**
   * Колбэк нажатия на воспроизведение песни
   */
  onPlayClicked() {
  }
}
