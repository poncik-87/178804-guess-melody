import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderPage from '../utils/renderPage';
import getRandomLevelPage from '../utils/getRandomLevelPage';

const initialGameState = {
  time: 10,
  lives: 3
};

// Приветствие
const template =
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

/**
 * Функция возвращает экран приветствия
 *
 * @return {HTMLElement}
 */
const welcomePage = () => {
  const welcomePageNode = getElementFromTemplate(template);

  let gamerAnswers = [];

  const startPlayButton = welcomePageNode.querySelector(`.main-play`);
  startPlayButton.addEventListener(`click`, () => {
    renderPage(getRandomLevelPage(gamerAnswers, initialGameState));
  });

  return welcomePageNode;
};

export default welcomePage;
