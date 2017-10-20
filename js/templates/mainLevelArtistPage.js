import {Answer} from '../consts';

import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderNextPage from '../utils/renderNextPage';
import gameStatusTemplate from './gameStatusTemplate';
import {audioControlTemplate, setAudioListeners} from './audioControlTemplate';

const taskTemplate =
  `<h2 class="title main-title">Кто исполняет эту песню?</h2>`;

/**
 * Функция возвращает шаблон блока ответа
 *
 * @param {string} songId Идентификатор песни
 * @param {Object} songData Объект данных песни
 * @param {string} songData.artist Имя исполнителя
 * @param {string} songData.image Изображение исполнителя
 *
 * @return {string} шаблон блока аудио
 */
const answerTemplate = (songId, songData) =>
  `<div class="main-answer-wrapper" data-answer-id=${songId}>
     <input class="main-answer-r" type="radio" id="answer-${songData.artist}" name="answer" value="val-${songData.artist}"/>
     <label class="main-answer" for="answer-${songData.artist}">
       <img class="main-answer-preview" src="${songData.image}"
            alt="${songData.artist}" width="134" height="134">
       ${songData.artist}
     </label>
   </div>`;

/**
 * Функция возвращает шаблон блока ответов
 *
 * @param {Object} answers Объект с вариантами ответов
 *
 * @return {string} шаблон блока ответов
 */
const answersFormTemplate = (answers) =>
  `<form class="main-list">
        ${[...Object.keys(answers)].map((id) => answerTemplate(id, answers[id])).join(``)}
   </form>`;

/**
 * Функция возвращает шаблон блока контента
 *
 * @param {Object} questionData Объект данных вопроса
 * @param {string} questionData.writeAnswerId Идентификатор правильного ответа
 * @param {Object} questionData.answers Объект с вариантами ответов
 *
 * @return {string} шаблон блока контента
 */
const contentTemplate = (questionData) =>
  `<div class="main-wrap">
      ${taskTemplate}
      ${audioControlTemplate(questionData.answers[questionData.writeAnswerId].src)}
      ${answersFormTemplate(questionData.answers)}
    </div>`;

/**
 * Функция возвращает шаблон страницы игры
 *
 * @param {Object} gameState Объект состояния игры
 * @param {Object} questionData Объект данных вопроса
 *
 * @return {string} шаблон блока страницы игры
 */
const levelArtistTemplate = (gameState, questionData) =>
  `<section class="main main--level main--level-artist">
     ${gameStatusTemplate(gameState)}
     ${contentTemplate(questionData)}
  </section>`;

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
  const artistPageNode = getElementFromTemplate(levelArtistTemplate(gameState, questionData));

  const answerAreaNodesList = [...artistPageNode.querySelectorAll(`.main-answer-wrapper`)];
  answerAreaNodesList.forEach((answerAreaNode) => {
    answerAreaNode.addEventListener(`click`, () => {
      if (questionData.writeAnswerId === answerAreaNode.dataset.answerId) {
        gamerAnswers.push(Answer.CORRECT);
      } else {
        gamerAnswers.push(Answer.INCORRECT);
        gameState.lives = gameState.lives - 1;
      }

      renderNextPage(gamerAnswers, gameState);
    });
  });

  setAudioListeners(artistPageNode);

  return artistPageNode;
};

export default mainLevelArtistPage;
