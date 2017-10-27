import {Answer} from '../../consts';

import routeToNextPage from '../../utils/routeToNextPage';
import AudioControlController from '../audioControl/AudioControlController';
import GameStatusController from '../GameStatus/GameStatusController';
import MainLevelArtistView from './MainLevelArtistView';

/**
 * Функция возвращает страницу игры с выбором артиста
 *
 * @param {GameState} gameState Состояния игры
 * @param {Object} gameData Данные игры
 * @param {Object} gameData.currentQuestion Текущий вопрос игры
 *
 * @return {HTMLElement} Страница игры
 */
const mainLevelArtistPage = (gameState, gameData) => {
  const gameStatusController = new GameStatusController(gameState);
  const audioControlController = new AudioControlController(
      gameData.currentQuestion.answers[gameData.currentQuestion.writeAnswerId].src);

  const view = new MainLevelArtistView(gameData.currentQuestion, {
    renderGameStatusView: gameStatusController.renderGameStatusView,
    renderAudioControlView: audioControlController.renderAudioControlView
  });

  const timerId = setInterval(() => {
    gameState = gameState.tickTime();

    if (gameState.time <= 0) {
      clearInterval(timerId);
      routeToNextPage(gameState, gameData);
    }

    gameStatusController.update(gameState);
  }, 1000);

  view.onAnswerClick = (isCorrectAnswer) => {
    if (isCorrectAnswer) {
      gameData = gameData.setQuestionAnswer(Answer.CORRECT);
    } else {
      gameData = gameData.setQuestionAnswer(Answer.INCORRECT);
      gameState = gameState.dropLive();
    }

    clearInterval(timerId);
    routeToNextPage(gameState, gameData);
  };

  return view.element;
};

export default mainLevelArtistPage;
