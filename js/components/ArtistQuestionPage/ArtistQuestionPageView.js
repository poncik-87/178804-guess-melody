import AbstractView from '../../AbstractView';

/**
 * Функция возвращает шаблон блока вопроса
 *
 * @param {string} question Текст вопроса
 *
 * @return {string} шаблон блока вопроса
 */
const taskTemplate = (question) =>
  `<h2 class="title main-title">${question}</h2>`;

/**
 * Функция возвращает шаблон блока ответа
 *
 * @param {Object} answer Данные варианта ответа
 * @param {string} answer.id Идентификатор ответа
 * @param {string} answer.title Имя исполнителя
 * @param {string} answer.image Изображение исполнителя
 *
 * @return {string} шаблон блока ответа
 */
const answerTemplate = (answer) =>
  `<div class="main-answer-wrapper" data-answer-id=${answer.id}>
     <input class="main-answer-r" type="radio" id="answer-${answer.title}" name="answer" value="val-${answer.title}"/>
     <label class="main-answer" for="answer-${answer.title}">
       <img class="main-answer-preview" src="${answer.image.url}"
            alt="${answer.title}" width="134" height="134">
       ${answer.title}
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
     ${answers.map(answerTemplate).join(``)}
   </form>`;

/**
 * Функция возвращает шаблон блока контента
 *
 * @param {Object} questionData Объект данных вопроса
 * @param {string} questionData.question Текст вопроса
 * @param {Object} questionData.answers Объект с вариантами ответов
 *
 * @return {string} шаблон блока контента
 */
const contentTemplate = (questionData) =>
  `<div class="main-wrap">
     ${taskTemplate(questionData.question)}
     ${answersFormTemplate(questionData.answers)}
   </div>`;

/**
 * Класс вью для игрового экрана выбора артиста
 */
export default class ArtistQuestionPageView extends AbstractView {
  /**
   * Функция инициализации вью
   *
   * @param {Object} questionData Объект данных вопроса
   * @param {Object} childViews Дочерние отображения
   * @param {Function} childViews.renderGameStatusView Функция отрисовки статуса игры
   * @param {Function} childViews.renderAudioControlView Функция отрисовки контрола аудио
   */
  init(questionData, childViews) {
    this._questionData = questionData;
    this._childViews = childViews;

    this.clearElement();
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
    this.element.insertBefore(this._childViews.renderGameStatusView(), mainWrapNode);
    mainWrapNode.insertBefore(this._childViews.renderAudioControlView(), answersNode);
  }

  /**
   * @inheritdoc
   */
  bind() {
    const answerAreaNodesList = [...this.element.querySelectorAll(`.main-answer-wrapper`)];
    answerAreaNodesList.forEach((answerAreaNode) => {
      answerAreaNode.addEventListener(`click`, () => {
        this.onAnswerClick(answerAreaNode.dataset.answerId);
      });
    });
  }

  /**
   * Колбэк обработки нажатия на вариант ответа
   */
  onAnswerClick() {
  }
}
