import {Answer, QuestionType} from "../consts";

import timeConverter from '../utils/timeConverter';
import repeatTimes from '../utils/repeatTimes';
import getRandomListElement from '../utils/getRandomListElement';
import gameData from './gameData';

const initState = {
  lives: 3,
  time: timeConverter.timeToNumber({
    minutes: 5,
    seconds: 0
  }),
  questions: [],
  currentQuestionIdx: -1
};

const GAME_LENGTH = 10;
const ARTIST_ANSWER_VARIANTS_COUNT = 3;
const GENRE_ANSWER_VARIANTS_COUNT = 4;

/**
 * Класс состояния игры
 * Содержит жизни игрока, время игры, и данные вопросов текущей игры
 */
export default class GameState {
  constructor() {
    this._onTimeChangedCallbackSet = new Set();
    this._onLivesChangedCallbackSet = new Set();
  }
  /**
   * Функция генерирует новое игровое состояние
   *
   * @return {GameState} Новое состояние игры
   */
  static generate() {
    let newGameState = new GameState();
    newGameState._lives = initState.lives;
    newGameState._time = initState.time;
    newGameState._questions = initState.questions;
    newGameState._currentQuestionIdx = initState.currentQuestionIdx;
    repeatTimes(GAME_LENGTH, () => {
      const getQuestion = getRandomListElement([GameState._getArtistQuestion, GameState._getGenreQuestion]);
      newGameState._questions.push(getQuestion(gameData));
    });

    return newGameState;
  }

  /**
   * Функция копирует игровое состояние
   *
   * @param {GameState} oldGameState Старое игровое состояние
   * @return {GameState} Новое состояние игры
   * @private
   */
  static _copy(oldGameState) {
    let newGameState = new GameState();
    newGameState._lives = oldGameState._lives;
    newGameState._time = oldGameState._time;
    newGameState._questions = oldGameState._questions.slice();
    newGameState._currentQuestionIdx = oldGameState._currentQuestionIdx;
    newGameState._onTimeChangedCallbackSet = new Set(oldGameState._onTimeChangedCallbackSet);
    newGameState._onLivesChangedCallbackSet = new Set(oldGameState._onLivesChangedCallbackSet);

    return newGameState;
  }

  /**
   * Функция возвращает случайно сформированный объект вопроса для категории "артист"
   * Механизм случайной генерации:
   * -сначала из массива данных выбираются ANSWER_VARIANTS_COUNT случайных неповторяющихся объекта
   * -потом из них случайно выбирается правильный ответ для вопроса
   *
   * @param {Array<Object>} data Исходные данные игры
   * @param {string} data[].id Идентификатор песни
   * @param {string} data[].artist Имя исполнителя
   * @param {string} data[].image Url картинки исполнителя
   * @param {string} data[].src Url песни
   *
   * @return {Object} Объект вопроса категории "артист"
   */
  static _getArtistQuestion(data) {
    // массив копируется, чтобы не влиять на внешние данные
    data = data.slice();

    let answers = {};
    for (let i = 0; i < ARTIST_ANSWER_VARIANTS_COUNT; i++) {
      const randomDataItem = getRandomListElement(data);
      // элемент массива удаляется из него, чтобы не было повторяющихся вариантов ответов
      data.splice(data.indexOf(randomDataItem), 1);

      answers[randomDataItem.id] = {
        artist: randomDataItem.artist,
        image: randomDataItem.image,
        src: randomDataItem.src
      };
    }

    return {
      writeAnswerId: getRandomListElement(Object.keys(answers)),
      answers,
      type: QuestionType.ARTIST
    };
  }

  /**
   * Функция возвращает случайно сформированный объект вопроса для категории "жанр"
   * Механизм случайной генерации:
   * -сначала из массива данных выбираются ANSWER_VARIANTS_COUNT случайных неповторяющихся объекта
   * -потом из них случайно выбирается правильный ответ для вопроса
   *
   * @param {Array<Object>} data Исходные данные игры
   * @param {string} data[].id Идентификатор песни
   * @param {string} data[].genre Жанр песни
   * @param {string} data[].src Url песни
   *
   * @return {Object} Объект вопроса категории "жанр"
   */
  static _getGenreQuestion(data) {
    // массив копируется, чтобы не влиять на внешние данные
    data = data.slice();

    let answers = [];
    for (let i = 0; i < GENRE_ANSWER_VARIANTS_COUNT; i++) {
      const randomDataItem = getRandomListElement(data);
      // элемент массива удаляется из него, чтобы не было повторяющихся вариантов ответов
      data.splice(data.indexOf(randomDataItem), 1);

      answers.push({
        id: randomDataItem.id,
        src: randomDataItem.src,
        genre: randomDataItem.genre
      });
    }

    return {
      writeAnswerGenre: getRandomListElement(answers).genre,
      answers,
      type: QuestionType.GENRE
    };
  }

  /**
   * Количество жизней игрока
   *
   * @return {number} Количество жизней игрока
   */
  get lives() {
    return this._lives;
  }

  /**
   * Текущее время игры
   *
   * @return {number} Время игры
   */
  get time() {
    return this._time;
  }

  /**
   * @return {Array<Object>} Возвращает список вопросов текущей игры
   */
  get questions() {
    return this._questions;
  }

  /**
   * @return {Object} Возвращает объект текущего вопроса
   */
  get currentQuestion() {
    return this._questions[this._currentQuestionIdx];
  }

  /**
   * @return {boolean} Признак того, есть ли еще неотвеченные вопросы
   */
  get hasNextQuestion() {
    return this._currentQuestionIdx + 1 < this._questions.length;
  }

  /**
   * @return {Object} Счет игрока в виде объекта {totalScore, fastAnswersScore}
   */
  get userScore() {
    if (this._lives <= 0) {
      return null;
    }

    const initScore = {
      totalScore: 0,
      fastAnswersScore: 0
    };

    return this._questions.reduce((acc, it) => {
      switch (it.answer) {
        case Answer.CORRECT:
          acc.totalScore = acc.totalScore + 1;
          break;
        case Answer.FAST_CORRECT:
          acc.totalScore = acc.totalScore + 2;
          acc.fastAnswersScore = acc.fastAnswersScore + 2;
          break;
        case Answer.INCORRECT:
          acc.totalScore = acc.totalScore - 2;
          break;
        default:
          break;
      }
      return acc;
    }, initScore);
  }

  /**
   * Функция уменьшает количество жизней игрока на 1
   *
   * @return {GameState} Новое состояние игры
   */
  dropLive() {
    let newGameState = GameState._copy(this);
    newGameState._lives = newGameState._lives - 1;

    // оповещение подписчиков об изменении модели
    for (let callback of this._onLivesChangedCallbackSet) {
      callback(newGameState._lives);
    }

    return newGameState;
  }

  /**
   * Функция уменьшает время игры на 1 секунду
   *
   * @return {GameState} Новое состояние игры
   */
  tickTime() {
    let newGameState = GameState._copy(this);
    newGameState._time = newGameState._time - 1;

    // оповещение подписчиков об изменении модели
    for (let callback of this._onTimeChangedCallbackSet) {
      callback(newGameState._time);
    }

    return newGameState;
  }

  /**
   * Функция перемещает индекс текущего вопроса
   *
   * @return {GameState} Новое состояние игры
   */
  iterateQuestion() {
    let newGameState = GameState._copy(this);
    newGameState._currentQuestionIdx = newGameState._currentQuestionIdx + 1;
    return newGameState;
  }

  /**
   * Функция назначает ответ на текущий вопрос
   *
   * @param {string} answer Ответ на текущий вопрос
   *
   * @return {GameState} Новое состояние игры
   */
  setQuestionAnswer(answer) {
    let newGameState = GameState._copy(this);
    newGameState._questions[newGameState._currentQuestionIdx].answer = answer;
    return newGameState;
  }

  /**
   * Функция подписки на событие изменения оставшегося времени игры
   *
   * @param {Function} callback Колбэк обрабатывающий изменение оставшегося времени игры
   */
  subscribeOnTimeChanged(callback) {
    this._onTimeChangedCallbackSet.add(callback);
  }

  /**
   * Функция подписки на событие изменения количества жизней игрока
   *
   * @param {Function} callback Колбэк обрабатывающий изменение количества жизней игрока
   */
  subscribeOnLivesChanged(callback) {
    this._onLivesChangedCallbackSet.add(callback);
  }
}
