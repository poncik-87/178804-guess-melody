import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderPage from '../utils/renderPage';
import getRandomListElement from '../utils/getRandomListElement';
import resultLoosePage from './resultLoosePage';
import resultTimeoutPage from './resultTimeoutPage';
import resultWinPage from './resultWinPage';

// Игра на выбор жанра
const markupString =
  `<section class="main main--level main--level-genre">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(..#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>
    <div class="main-mistakes">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    </div>

    <div class="main-wrap">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-1">
          <label class="genre-answer-check" for="a-1"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-2">
          <label class="genre-answer-check" for="a-2"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-3">
          <label class="genre-answer-check" for="a-3"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-4">
          <label class="genre-answer-check" for="a-4"></label>
        </div>

        <button class="genre-answer-send" type="submit" disabled>Ответить</button>
      </form>
    </div>
  </section>`;

/**
 * Определяет выбран ли хоть один чекбокс из списка
 *
 * @param {HTMLInputElement[]} checkboxList Список чекбоксов
 * @param {HTMLInputElement} currentCheckbox Текущий чекбокс
 * @return {boolean} Выбран ли хоть один чекбокс
 */
function isAnswerChosen(checkboxList, currentCheckbox) {
  let isChosen = false;
  if (currentCheckbox.checked) {
    isChosen = true;
  } else {
    checkboxList.forEach((checkbox) => {
      isChosen = isChosen || checkbox.checked;
    });
  }

  return isChosen;
}

const mainLevelGenrePage = getElementFromTemplate(markupString);

const sendAnswerButton = mainLevelGenrePage.querySelector(`.genre-answer-send`);

sendAnswerButton.addEventListener(`click`, () => {
  renderPage(getRandomListElement([resultLoosePage, resultTimeoutPage, resultWinPage]));
});

// активация кнопки "ответить" только если выбран какой-либо ответ
const answerCheckboxList = [...mainLevelGenrePage.querySelectorAll(`.genre-answer input[type=checkbox]`)];
answerCheckboxList.forEach((answerCheckbox) => {
  answerCheckbox.addEventListener(`change`, () => {
    sendAnswerButton.disabled = !isAnswerChosen(answerCheckboxList, answerCheckbox);
  });
});

export default mainLevelGenrePage;
