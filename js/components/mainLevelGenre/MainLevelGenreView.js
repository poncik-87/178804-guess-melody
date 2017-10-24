import AbstractView from '../../AbstractView';

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
 * Класс вью для игрового экрана выбора музыкального жанра
 */
export default class MainLevelGenreView extends AbstractView {
  /**
   *
   * @param {Object} gameState Состояние игры
   * @param {Object} questionData Объект данных вопроса
   * @param {HTMLElement} gameStatusComponent Компонент статуса игры
   * @param {HTMLElement[]} audioControlComponentsList Список компонент контрола аудио
   */
  constructor(gameState, questionData, gameStatusComponent, audioControlComponentsList) {
    super();

    this._gameState = gameState;
    this._questionData = questionData;
    this._gameStatusComponent = gameStatusComponent;
    this._audioControlComponentsList = audioControlComponentsList;
  }

  /**
   * @inheritdoc
   */
  get template() {
    return (
      `<section class="main main--level main--level-genre">
         ${contentTemplate(this._questionData)}
       </section>`
    );
  }

  /**
   * @inheritdoc
   */
  insertChildren() {
    const mainWrapNode = this.element.querySelector(`.main-wrap`);
    this.element.insertBefore(this._gameStatusComponent, mainWrapNode);

    const answersNodeList = [...this.element.querySelectorAll(`.genre-answer`)];
    for (let i = 0, length = answersNodeList.length; i < length; i++) {
      const answerNode = answersNodeList[i];
      const answerInputNode = answerNode.querySelector(`input`);
      answerNode.insertBefore(this._audioControlComponentsList[i], answerInputNode);
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

      const isCorrectAnswer = !answerCheckboxNodeList.filter(({checked}) => checked).some(({value}) => value !== this._questionData.writeAnswerGenre);

      this.onAnswerClick(isCorrectAnswer);
    });
  }

  /**
   * Колбэк обработки нажатия на подтверждение ответа
   */
  onAnswerClick() {
  }
}
