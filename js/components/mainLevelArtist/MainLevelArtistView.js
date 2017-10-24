import AbstractView from '../../AbstractView';

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
     ${answersFormTemplate(questionData.answers)}
   </div>`;

/**
 * Класс вью для игрового экрана выбора артиста
 */
export default class MainLevelArtistView extends AbstractView {
  /**
   *
   * @param {Object} gameState Состояние игры
   * @param {Object} questionData Объект данных вопроса
   * @param {HTMLElement} gameStatusComponent Компонент статуса игры
   * @param {HTMLElement} audioControlComponent Компонент контрола аудио
   */
  constructor(gameState, questionData, gameStatusComponent, audioControlComponent) {
    super();

    this._gameState = gameState;
    this._questionData = questionData;
    this._gameStatusComponent = gameStatusComponent;
    this._audioControlComponent = audioControlComponent;
  }

  /**
   * @inheritdoc
   */
  get template() {
    return (
      `<section class="main main--level main--level-artist">
         ${contentTemplate(this._questionData)}
       </section>`
    );
  }

  /**
   * @inheritdoc
   */
  insertChildren() {
    const mainWrapNode = this.element.querySelector(`.main-wrap`);
    const answersNode = this.element.querySelector(`.main-list`);
    this.element.insertBefore(this._gameStatusComponent, mainWrapNode);
    mainWrapNode.insertBefore(this._audioControlComponent, answersNode);
  }

  /**
   * @inheritdoc
   */
  bind() {
    const answerAreaNodesList = [...this.element.querySelectorAll(`.main-answer-wrapper`)];
    answerAreaNodesList.forEach((answerAreaNode) => {
      answerAreaNode.addEventListener(`click`, () => {
        this.onAnswerClick(this._questionData.writeAnswerId === answerAreaNode.dataset.answerId);
      });
    });
  }

  /**
   * Колбэк обработки нажатия на вариант ответа
   */
  onAnswerClick() {
  }
}
