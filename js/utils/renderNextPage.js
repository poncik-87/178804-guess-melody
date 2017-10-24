import renderPage from './renderPage';
import getRandomLevelPage from './getRandomLevelPage';
import getUserScore from './getUserScore';
import getGameResultMessage from './getGameResultMessage';
import resultWinPage from '../components/resultWin/resultWinPage';
import resultLoosePage from '../components/resultLoose/resultLoosePage';
import resultTimeoutPage from '../components/resultTimeout/resultTimeoutPage';

/**
 * Функция отрисовывает следующий экран игры
 *
 * @param {Array<string>} gamerAnswers Список ответов игрока
 * @param {Object} gameState Состояние игры
 * @param {number} gameState.lives Количество жизней игрока
 * @param {number} gameState.time Оставшееся время
 */
export default function renderNextPage(gamerAnswers, gameState) {
  if (gameState.time <= 0) {
    renderPage(resultTimeoutPage(getGameResultMessage({time: gameState.time})));
  } else if (gameState.lives <= 0) {
    renderPage(resultLoosePage(getGameResultMessage({lives: gameState.lives})));
  } else if (gamerAnswers.length < 10) {
    renderPage(getRandomLevelPage(gamerAnswers, gameState));
  } else {
    const userScore = getUserScore(gamerAnswers, gameState.lives);
    const result = {
      score: userScore.score,
      lives: gameState.lives,
      time: gameState.time
    };
    const resultMessage = getGameResultMessage(result, []);
    renderPage(resultWinPage(userScore, resultMessage, gameState));
  }
}
