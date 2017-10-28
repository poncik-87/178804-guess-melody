import {QuestionType} from '../consts';

import renderPage from './renderPage';
import mainLevelArtistPage from '../components/mainLevelArtist/mainLevelArtistPage';
import mainLevelGenrePage from '../components/mainLevelGenre/mainLevelGenrePage';
import getGameResultMessage from './getGameResultMessage';
import resultWinPage from '../components/resultWin/resultWinPage';
import resultLoosePage from '../components/resultLoose/resultLoosePage';
import resultTimeoutPage from '../components/resultTimeout/resultTimeoutPage';

/**
 * Функция отрисовывает следующий экран игры
 *
 * @param {Object} gameState Состояние игры
 * @param {number} gameState.lives Количество жизней игрока
 * @param {number} gameState.time Оставшееся время игры
 * @param {boolean} gameState.hasNextQuestion Признак того, что есть следующий вопрос
 * @param {Object} gameState.currentQuestion Текущий вопрос игры
 * @param {string} gameState.currentQuestion.type Тип текущего вопроса игры
 * @param {Object} gameState.userScore Объект счета игрока
 * @param {number} gameState.userScore.totalScore Общий счет игрока
 */
export default function routeToNextPage(gameState) {
  if (gameState.time <= 0) {
    renderPage(resultTimeoutPage(getGameResultMessage({time: gameState.time})));
  } else if (gameState.lives <= 0) {
    renderPage(resultLoosePage(getGameResultMessage({lives: gameState.lives})));
  } else if (gameState.hasNextQuestion) {
    gameState = gameState.iterateQuestion();

    if (gameState.currentQuestion.type === QuestionType.ARTIST) {
      renderPage(mainLevelArtistPage(gameState));
    } else if (gameState.currentQuestion.type === QuestionType.GENRE) {
      renderPage(mainLevelGenrePage(gameState));
    }
  } else {
    const userScore = gameState.userScore;
    // TODO: вторым параметром передавать результаты других игроков
    const resultMessage = getGameResultMessage({
      score: userScore.totalScore,
      lives: gameState.lives,
      time: gameState.time
    }, []);

    renderPage(resultWinPage(gameState, userScore, resultMessage));
  }
}
