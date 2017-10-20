import {Answer} from '../consts';

import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderNextPage from '../utils/renderNextPage';
import gameStatusTemplate from './gameStatusTemplate';
import {audioControlTemplate, setAudioListeners} from './audioControlTemplate';

/**
 * Функция возвращает блок текста вопроса
 *
 * @param {string} genre Жанр музыки вопроса
 *
 * @return {string} шаблон блока вопроса
 */
const taskTemplate = (genre) =>
  `<h2 class="title">Выберите ${genre} треки</h2>`;

/**
 * Функция возвращает блок ответа
 *
 * @param {Object} answer Объект варианта ответа
 * @param {string} answer.id Идентификатор песни
 * @param {string} answer.src Url песни
 * @param {string} answer.genre Жанр песни
 *
 * @return {string} шаблон блока ответа
 */
const answerTemplate = (answer) =>
  `<div class="genre-answer">
     ${audioControlTemplate(answer.src)}
     <input type="checkbox" name="answer" value=${answer.genre} id=${answer.id}>
     <label class="genre-answer-check" for=${answer.id}></label>
   </div>`;

/**
 * Функция возвращает шаблон блока ответов
 *
 * @param {Array<Object>} answers Объект с вариантами ответов
 *
 * @return {string} шаблон блока ответов
 */
const answersFormTemplate = (answers) =>
  `<form class="genre">
     ${answers.map(answerTemplate)}     
     <button class="genre-answer-send" type="submit" disabled>Ответить</button>
   </form>`;

/**
 * Функция возвращает шаблон блока контента
 *
 * @param {Object} questionData Объект данных вопроса
 * @param {string} questionData.writeAnswerGenre Жанр правильного ответа
 * @param {Object} questionData.answers Объект с вариантами ответов
 *
 * @return {string} шаблон блока контента
 */
const contentTemplate = (questionData) =>
  `<div class="main-wrap">
      ${taskTemplate(questionData.writeAnswerGenre)}
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
const levelGenreTemplate = (gameState, questionData) =>
  `<section class="main main--level main--level-genre">
    ${gameStatusTemplate(gameState)}
    ${contentTemplate(questionData)}
  </section>`;

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
  const genrePageNode = getElementFromTemplate(levelGenreTemplate(gameState, questionData));

  const answerCheckboxNodeList = [...genrePageNode.querySelectorAll(`.genre-answer input[type=checkbox]`)];
  const sendAnswerButtonNode = genrePageNode.querySelector(`.genre-answer-send`);

  // активация кнопки "ответить" только если выбран какой-либо ответ
  answerCheckboxNodeList.forEach((answerCheckboxNode) => {
    answerCheckboxNode.addEventListener(`change`, () => {
      sendAnswerButtonNode.disabled = !answerCheckboxNodeList.some(({checked}) => checked);
    });
  });

  sendAnswerButtonNode.addEventListener(`click`, () => {
    const isWrongAnswer = answerCheckboxNodeList.
        filter(({checked}) => checked).
        some(({value}) => value !== questionData.writeAnswerGenre);

    if (isWrongAnswer) {
      gamerAnswers.push(Answer.INCORRECT);
      gameState.lives = gameState.lives - 1;
    } else {
      gamerAnswers.push(Answer.CORRECT);
    }

    renderNextPage(gamerAnswers, gameState);
  });

  setAudioListeners(genrePageNode);

  return genrePageNode;
};

export default mainLevelGenrePage;
