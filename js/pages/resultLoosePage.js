import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderPage from '../utils/renderPage';
import welcomePage from './welcomePage';

// Результат игры: проигрыш закончились попытки
const markupString =
  `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`;

const resultLoosePage = getElementFromTemplate(markupString);
const restartButton = resultLoosePage.querySelector(`.main-replay`);
restartButton.addEventListener(`click`, () => {
  renderPage(welcomePage);
});

export default resultLoosePage;
