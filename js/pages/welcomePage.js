import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderPage from '../utils/renderPage';
import mainLevelArtistPage from './mainLevelArtistPage';

// Приветствие
const markupString =
  `<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>`;

const welcomePage = getElementFromTemplate(markupString);
const startPlayButton = welcomePage.querySelector(`.main-play`);
startPlayButton.addEventListener(`click`, () => {
  renderPage(mainLevelArtistPage);
});

export default welcomePage;
