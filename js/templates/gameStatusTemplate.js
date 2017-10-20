const timerTemplate =
  `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
     <circle
       cx="390" cy="390" r="370"
       class="timer-line"
       style="filter: url(..#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
     </circle>

     <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
       <span class="timer-value-mins">05</span>
       <span class="timer-value-dots">:</span>
       <span class="timer-value-secs">00</span>
     </div>
   </svg>`;

/**
 * Функция возвращает шаблон блока жизней игрока
 *
 * @param {number} lives Количество жизней игрока
 *
 * @return {string} Шаблон блока жизней игрока
 */
const livesTemplate = (lives) =>
  `<div class="main-mistakes">
     ${new Array(lives)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
   </div>`;

/**
 * Функция возвращает шаблон блока статуса игры
 *
 * @param {Object} state Состояние игры
 * @param {number} state.lives Количество жизней игрока
 *
 * @return {string} Шаблон блока статуса игры
 */
const gameStatusTemplate = (state) =>
  `${timerTemplate}
   ${livesTemplate(state.lives)}`;

export default gameStatusTemplate;
