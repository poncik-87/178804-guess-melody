import {QuestionType} from '../consts';

import getGameResultMessage from './getGameResultMessage';
import App from '../App';

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
    App.showResultTimeoutPage(getGameResultMessage({time: gameState.time}));
  } else if (gameState.lives <= 0) {
    App.showResultLoosePage(getGameResultMessage({lives: gameState.lives}));
  } else if (gameState.hasNextQuestion) {
    gameState = gameState.iterateQuestion();

    if (gameState.currentQuestion.type === QuestionType.ARTIST) {
      App.showArtistQuestionPage(gameState);
    } else if (gameState.currentQuestion.type === QuestionType.GENRE) {
      App.showGenreQuestionPage(gameState);
    }
  } else {
    const userScore = gameState.userScore;
    // TODO: вторым параметром передавать результаты других игроков
    const resultMessage = getGameResultMessage({
      score: userScore.totalScore,
      lives: gameState.lives,
      time: gameState.time
    }, []);

    App.showResultWinPage({
      lives: gameState.lives,
      time: gameState.time,
      userScore,
      resultMessage
    });
  }
}
