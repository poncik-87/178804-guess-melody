import {Answer} from '../../consts';

import routeToNextPage from '../../utils/routeToNextPage';
import AudioControlController from '../audioControl/AudioControlController';
import GameStatusController from '../GameStatus/GameStatusController';
import MainLevelArtistView from './MainLevelArtistView';

/**
 * Функция возвращает страницу игры с выбором артиста
 *
 * @param {GameState} gameState Состояния игры
 * @param {number} gameState.lives Количество жизней игрока
 * @param {number} gameState.time Оставшееся время игры
 * @param {Object} gameState.currentQuestion Текущий вопрос игры
 * @param {Array<Object>} gameState.currentQuestion.answers Ответы на текущий вопрос
 * @param {number} gameState.currentQuestion.writeAnswerId Идентификатор правильного ответа на текущий вопрос
 *
 * @return {HTMLElement} Страница игры
 */
const mainLevelArtistPage = (gameState) => {
  const gameStatusController = new GameStatusController({
    lives: gameState.lives,
    time: gameState.time
  });

  const writeAnswer = gameState.currentQuestion.answers[gameState.currentQuestion.writeAnswerId];
  const audioControlController = new AudioControlController(writeAnswer.src);

  const view = new MainLevelArtistView(gameState.currentQuestion, {
    renderGameStatusView: gameStatusController.renderGameStatusView,
    renderAudioControlView: audioControlController.renderAudioControlView
  });

  const timerId = setInterval(() => {
    gameState = gameState.tickTime();

    if (gameState.time <= 0) {
      clearInterval(timerId);
      routeToNextPage(gameState);
    }

    gameStatusController.update({
      lives: gameState.lives,
      time: gameState.time
    });
  }, 1000);

  view.onAnswerClick = (isCorrectAnswer) => {
    if (isCorrectAnswer) {
      gameState = gameState.setQuestionAnswer(Answer.CORRECT);
    } else {
      gameState = gameState.setQuestionAnswer(Answer.INCORRECT).dropLive();
    }

    clearInterval(timerId);
    routeToNextPage(gameState);
  };

  return view.element;
};

export default mainLevelArtistPage;
