/**
 * Функция возвращает шаблон блока аудио
 *
 * @param {string} src Url песни
 *
 * @return {string} шаблон блока аудио
 */
const audioControlTemplate = (src) =>
  `<div class="player-wrapper">
     <div class="player">
       <audio src="${src}"></audio>
         <button class="player-control player-control--play"></button>
         <div class="player-track">
           <span class="player-status"></span>
         </div>
     </div>
   </div>`;

/**
 * Функция навешивает обработчики на блок аудио
 *
 * @param {HtmlElement} parentNode Родительский dom элемент
 */
const setAudioListeners = (parentNode) => {
  const audioControlWrappersNodeList = [...parentNode.querySelectorAll(`.player-wrapper`)];
  audioControlWrappersNodeList.forEach((audioControlWrapperNode) => {
    const audioControlButtonNode = audioControlWrapperNode.querySelector(`.player-control`);
    const audioNode = audioControlWrapperNode.querySelector(`audio`);
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
  });
};

export {audioControlTemplate, setAudioListeners};
