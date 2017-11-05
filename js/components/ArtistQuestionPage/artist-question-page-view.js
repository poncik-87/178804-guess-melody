import AbstractView from '../../abstract-view';

/**
 * Класс вью для игрового экрана выбора артиста
 */
export default class ArtistQuestionPageView extends AbstractView {
  /**
   * @inheritdoc
   */
  get template() {
    return (
      `<section class="main main--level main--level-artist">
         ${this._contentTemplate()}
       </section>`
    );
  }

  /**
   * Функция инициализации вью
   *
   * @param {Object} questionData Объект данных вопроса
   * @param {Object} childrenViews Дочерние отображения
   * @param {Function} childrenViews.gameStatusView Вью статуса игры
   * @param {Function} childrenViews.audioControlView Вью контрола аудио
   */
  init(questionData, childrenViews) {
    this._questionData = questionData;
    this._childrenViews = childrenViews;

    this.clearElement();
  }

  /**
   * @inheritdoc
   */
  insertChildren() {
    const mainWrapNode = this.element.querySelector(`.main-wrap`);
    const answersNode = this.element.querySelector(`.main-list`);
    this.element.insertBefore(this._childrenViews.gameStatusView.element, mainWrapNode);
    mainWrapNode.insertBefore(this._childrenViews.audioControlView.element, answersNode);
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
   * Функция возвращает шаблон блока вопроса
   *
   * @return {string} шаблон блока вопроса
   */
  _taskTemplate() {
    return (
      `<h2 class="title main-title">${this._questionData.question}</h2>`
    );
  }

  /**
   * Функция возвращает шаблон блока ответов
   *
   * @return {string} шаблон блока ответов
   */
  _answersFormTemplate() {
    return (
      `<form class="main-list">
         ${this._questionData.answers.map(ArtistQuestionPageView._answerTemplate).join(``)}
       </form>`
    );
  }

  /**
   * Функция возвращает шаблон блока контента
   *
   * @return {string} шаблон блока контента
   */
  _contentTemplate() {
    return (
      `<div class="main-wrap">
         ${this._taskTemplate()}
         ${this._answersFormTemplate()}
       </div>`
    );
  }

  /**
   * Колбэк обработки нажатия на вариант ответа
   */
  onAnswerClick() {
  }

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
  static _answerTemplate(answer) {
    return (
      `<div class="main-answer-wrapper" data-answer-id=${answer.id}>
         <input class="main-answer-r" type="radio" id="answer-${answer.title}" name="answer" value="val-${answer.title}"/>
         <label class="main-answer" for="answer-${answer.title}">
           <img class="main-answer-preview" src="${answer.image.url}"
                alt="${answer.title}" width="134" height="134">
           ${answer.title}
         </label>
       </div>`
    );
  }
}
