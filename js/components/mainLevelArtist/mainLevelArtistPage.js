import {Answer} from '../../consts';

import renderNextPage from '../../utils/renderNextPage';
import AudioControlController from '../audioControl/AudioControlController';
import GameStatusController from '../GameStatus/GameStatusController';
import MainLevelArtistView from './MainLevelArtistView';

/**
 * Функция возвращает страницу игры с выбором артиста
 *
 * @param {Object} gameState Объект состояния игры
 * @param {Object} questionData Объект данных вопроса
 * @param {Array<string>} gamerAnswers Массив ответов игрока
 *
 * @return {HTMLElement} Страница игры
 */
const mainLevelArtistPage = (gameState, questionData, gamerAnswers) => {
  const gameStatusComponent = new GameStatusController(gameState);
  const audioControlComponent = new AudioControlController(
      questionData.answers[questionData.writeAnswerId].src);

  const view = new MainLevelArtistView(
      gameState, questionData, gameStatusComponent.element, audioControlComponent.element);
  view.onAnswerClick = (isCorrectAnswer) => {
    if (isCorrectAnswer) {
      gamerAnswers.push(Answer.CORRECT);
    } else {
      gamerAnswers.push(Answer.INCORRECT);
      gameState.lives = gameState.lives - 1;
    }

    renderNextPage(gamerAnswers, gameState);
  };

  return view.element;
};

export default mainLevelArtistPage;
