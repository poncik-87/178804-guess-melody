import AbstractView from '../../AbstractView';

/**
 * Вью страницы вопроса жанра песни
 */
export default class GenreQuestionPageView extends AbstractView {
  /**
   * Функция инициализации вью
   *
   * @param {Object} questionData Объект данных вопроса
   * @param {Object} childrenViews Дочерние отображения
   * @param {Function} childrenViews.renderGameStatusView Функция отрисовки статуса игры
   * @param {Function[]} childrenViews.renderAudioControlViewsList Массив функций отрисовки контрола аудио
   */
  init(questionData, childrenViews) {
    this._questionData = questionData;
    this._childViews = childrenViews;

    this.clearElement();
  }

  /**
   * @inheritdoc
   */
  get template() {
    return (
      `<section class="main main--level main--level-genre">
         ${this._contentTemplate()}
       </section>`
    );
  }

  /**
   * @inheritdoc
   */
  insertChildren() {
    const mainWrapNode = this.element.querySelector(`.main-wrap`);
    this.element.insertBefore(this._childViews.renderGameStatusView(), mainWrapNode);

    const answersNodeList = [...this.element.querySelectorAll(`.genre-answer`)];
    for (let i = 0, length = answersNodeList.length; i < length; i++) {
      const answerNode = answersNodeList[i];
      const answerInputNode = answerNode.querySelector(`input`);
      answerNode.insertBefore(this._childViews.renderAudioControlViewsList[i](), answerInputNode);
    }
  }

  /**
   * @inheritdoc
   */
  bind() {
    const answerCheckboxNodeList = [...this.element.querySelectorAll(`.genre-answer input[type=checkbox]`)];
    const sendAnswerButtonNode = this.element.querySelector(`.genre-answer-send`);

    // активация кнопки "ответить" только если выбран какой-либо ответ
    answerCheckboxNodeList.forEach((answerCheckboxNode) => {
      answerCheckboxNode.addEventListener(`change`, () => {
        sendAnswerButtonNode.disabled = !answerCheckboxNodeList.some(({checked}) => checked);
      });
    });

    sendAnswerButtonNode.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const checkedAnswerGenres = answerCheckboxNodeList.filter(({checked}) => checked).map(({value}) => value);

      this.onAnswerClick(checkedAnswerGenres);
    });
  }

  /**
   * Функция возвращает блок текста вопроса
   *
   * @return {string} шаблон блока вопроса
   */
  _taskTemplate() {
    return (
      `<h2 class="title">${this._questionData.question}</h2>`
    );
  }

  /**
   * Функция возвращает шаблон блока ответов
   *
   * @return {string} шаблон блока ответов
   */
  _answersFormTemplate() {
    return (
      `<form class="genre">
         ${this._questionData.answers.map(GenreQuestionPageView._answerTemplate)}     
         <button class="genre-answer-send" type="submit" disabled>Ответить</button>
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
   * Колбэк обработки нажатия на подтверждение ответа
   */
  onAnswerClick() {
  }

  /**
   * Функция возвращает шаблон блока ответа
   *
   * @param {Object} answer Объект варианта ответа
   * @param {string} answer.id Идентификатор песни
   * @param {string} answer.genre Жанр песни
   *
   * @return {string} шаблон блока ответа
   */
  static _answerTemplate(answer) {
    return (
      `<div class="genre-answer">
         <input type="checkbox" name="answer" value=${answer.genre} id=${answer.id}>
         <label class="genre-answer-check" for=${answer.id}></label>
       </div>`
    );
  }
}
