import renderPage from './renderPage';
import getRandomLevelPage from './getRandomLevelPage';
import getUserScore from './getUserScore';
import getGameResultMessage from './getGameResultMessage';
import resultWinPage from '../templates/resultWinPage';
import resultLoosePage from '../templates/resultLoosePage';
import resultTimeoutPage from '../templates/resultTimeoutPage';

/**
 * Функция отрисовывает следующий экран игры
 *
 * @param {Array<string>} gamerAnswers Список ответов игрока
 * @param {Object} state Состояние игры
 * @param {Object} state.lives Количество жизней игрока
 * @param {Object} state.time Оставшееся время
 */
export default function renderNextPage(gamerAnswers, state) {
  if (state.time <= 0) {
    renderPage(resultTimeoutPage(getGameResultMessage({time: state.time})));
  } else if (state.lives <= 0) {
    renderPage(resultLoosePage(getGameResultMessage({lives: state.lives})));
  } else if (gamerAnswers.length < 10) {
    renderPage(getRandomLevelPage(gamerAnswers, state));
  } else {
    const userScore = getUserScore(gamerAnswers, state.lives);
    const result = {
      score: userScore.score,
      lives: state.lives,
      time: state.time
    };
    const resultMessage = getGameResultMessage(result, []);
    renderPage(resultWinPage(userScore, resultMessage, state));
  }
}
