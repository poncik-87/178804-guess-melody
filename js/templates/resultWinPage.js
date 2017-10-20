import getElementFromTemplate from '../utils/getElementFromTemplate';
import getMistakesCount from '../utils/getMistakesCount';
import renderPage from '../utils/renderPage';
import welcomePage from './welcomePage';

/**
 * Функция возвращает шаблон страницы результата
 *
 * @param {Object} userScore Счет игрока
 * @param {number} userScore.totalScore Общий счет
 * @param {number} userScore.fastAnswersScore Счет быстрых ответов
 * @param {string} resultMessage Сообщение с результатом
 * @param {Object} state Состояние игры
 * @param {number} state.lives Количество жизней игрока
 *
 * @return {string} шаблон блока страницы
 */
const template = (userScore, resultMessage, state) =>
  `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
      <br>вы&nbsp;набрали ${userScore.totalScore} баллов (${userScore.fastAnswersScore} быстрых)
      <br>совершив ${getMistakesCount(state.lives)} ошибки</div>
    <span class="main-comparison">${resultMessage}</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

/**
 * Функция возвращает страницу выигрышного результата
 *
 * @param {Object} userScore Счет игрока
 * @param {string} resultMessage Сообщение с результатом
 * @param {Object} state Состояние игры
 *
 * @return {string} шаблон блока страницы
 */
const resultWinPage = (userScore, resultMessage, state) => {
  const winPageNode = getElementFromTemplate(template(userScore, resultMessage, state));

  const restartButton = winPageNode.querySelector(`.main-replay`);
  restartButton.addEventListener(`click`, () => {
    renderPage(welcomePage());
  });

  return winPageNode;
};

export default resultWinPage;
