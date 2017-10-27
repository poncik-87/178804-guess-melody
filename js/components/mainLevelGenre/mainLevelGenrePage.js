import {Answer} from '../../consts';

import routeToNextPage from '../../utils/routeToNextPage';
import GameStatusController from '../GameStatus/GameStatusController';
import AudioControlController from '../audioControl/AudioControlController';
import MainLevelGenreView from './MainLevelGenreView';

/**
 * Функция возвращает страницу игры с выбором жанра
 *
 * @param {GameState} gameState Состояния игры
 * @param {Object} gameData Данные игры
 * @param {Object} gameData.currentQuestion Текущий вопрос игры
 *
 * @return {HTMLElement} Страница игры
 */
const mainLevelGenrePage = (gameState, gameData) => {
  const gameStatusController = new GameStatusController(gameState);
  const renderAudioControlViewList = gameData.currentQuestion.answers.map(({src}) =>
    (new AudioControlController(src)).renderAudioControlView);

  const view = new MainLevelGenreView(gameData.currentQuestion, {
    renderGameStatusView: gameStatusController.renderGameStatusView,
    renderAudioControlViewList
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

export default mainLevelGenrePage;
