import {Answer} from '../../consts';

import renderNextPage from '../../utils/renderNextPage';
import GameStatusController from '../GameStatus/GameStatusController';
import AudioControlController from '../audioControl/AudioControlController';
import MainLevelGenreView from './MainLevelGenreView';

/**
 * Функция возвращает страницу игры с выбором жанра
 *
 * @param {Object} gameState Объект состояния игры
 * @param {Object} questionData Объект данных вопроса
 * @param {Array<string>} gamerAnswers Массив ответов игрока
 *
 * @return {HTMLElement} Страница игры
 */
const mainLevelGenrePage = (gameState, questionData, gamerAnswers) => {
  const gameStatusComponent = new GameStatusController(gameState);
  const audioControlComponentsList = questionData.answers.map(({src}) =>
    (new AudioControlController(src)).element);

  const view = new MainLevelGenreView(
      gameState, questionData, gameStatusComponent.element, audioControlComponentsList);
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

export default mainLevelGenrePage;
