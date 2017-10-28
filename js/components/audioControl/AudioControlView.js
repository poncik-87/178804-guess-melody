import AbstractView from '../../AbstractView';

/**
 * Класс вью для контрола аудио
 */
export default class AudioControlView extends AbstractView {
  /**
   * @param {string} src Url аудиозаписи
   */
  constructor(src) {
    super();

    this._src = src;
  }

  /**
   * @inheritdoc
   */
  get template() {
    return (
      `<div class="player-wrapper">
         <div class="player">
           <audio src="${this._src}"></audio>
           <button class="player-control player-control--play"></button>
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
    const audioNode = this.element.querySelector(`audio`);

    audioControlButtonNode.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const buttonClassNames = audioControlButtonNode.classList;
      if (buttonClassNames.contains(`player-control--play`)) {
        audioNode.play();
      } else {
        audioNode.pause();
      }
      buttonClassNames.toggle(`player-control--pause`);
      buttonClassNames.toggle(`player-control--play`);
    });
  }
}
