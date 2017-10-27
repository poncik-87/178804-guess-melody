import {QuestionType} from '../consts';

import renderPage from './renderPage';
import mainLevelArtistPage from '../components/mainLevelArtist/mainLevelArtistPage';
import mainLevelGenrePage from '../components/mainLevelGenre/mainLevelGenrePage';
import getUserScore from './getUserScore';
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
 * @param {Object} gameData Данные игры
 * @param {boolean} gameData.hasNextQuestion Признак того, что есть следующий вопрос
 */
export default function routeToNextPage(gameState, gameData) {
  if (gameState.time <= 0) {
    renderPage(resultTimeoutPage(getGameResultMessage({time: gameState.time})));
  } else if (gameState.lives <= 0) {
    renderPage(resultLoosePage(getGameResultMessage({lives: gameState.lives})));
  } else if (gameData.hasNextQuestion) {
    gameData = gameData.iterateQuestion();

    if (gameData.currentQuestion.type === QuestionType.ARTIST) {
      renderPage(mainLevelArtistPage(gameState, gameData));
    } else if (gameData.currentQuestion.type === QuestionType.GENRE) {
      renderPage(mainLevelGenrePage(gameState, gameData));
    }
  } else {
    const userScore = getUserScore(gameState.lives, gameData);
    // TODO: вторым параметром передавать результаты других игроков
    const resultMessage = getGameResultMessage({
      score: userScore.score,
      lives: gameState.lives,
      time: gameState.time
    }, []);

    renderPage(resultWinPage(gameState, userScore, resultMessage));
  }
}
