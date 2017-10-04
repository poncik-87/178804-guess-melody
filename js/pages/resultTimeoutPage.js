import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderPage from '../utils/renderPage';
import welcomePage from './welcomePage';

// Результат игры: проигрыш время вышло
const markupString =
  `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

const resultTimeoutPage = getElementFromTemplate(markupString);
const restartButton = resultTimeoutPage.querySelector(`.main-replay`);
restartButton.addEventListener(`click`, () => {
  renderPage(welcomePage);
});

export default resultTimeoutPage;
