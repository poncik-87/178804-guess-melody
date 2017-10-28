import {Answer} from '../../consts';

import routeToNextPage from '../../utils/routeToNextPage';
import GameStatusController from '../GameStatus/GameStatusController';
import AudioControlController from '../audioControl/AudioControlController';
import MainLevelGenreView from './MainLevelGenreView';

/**
 * Функция возвращает страницу игры с выбором жанра
 *
 * @param {GameState} gameState Состояния игры
 * @param {number} gameState.lives Количество жизней игрока
 * @param {number} gameState.time Оставшееся время игры
 * @param {Object} gameState.currentQuestion Текущий вопрос игры
 * @param {Array<Object>} gameState.currentQuestion.answers Ответы на текущий вопрос
 *
 * @return {HTMLElement} Страница игры
 */
const mainLevelGenrePage = (gameState) => {
  const gameStatusController = new GameStatusController({
    lives: gameState.lives,
    time: gameState.time
  });
  const renderAudioControlViewList = gameState.currentQuestion.answers.map(({src}) =>
    (new AudioControlController(src)).renderAudioControlView);

  const view = new MainLevelGenreView(gameState.currentQuestion, {
    renderGameStatusView: gameStatusController.renderGameStatusView,
    renderAudioControlViewList
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

export default mainLevelGenrePage;
