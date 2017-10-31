import {Answer} from "../consts";

import timeConverter from '../utils/timeConverter';

const initState = {
  lives: 3,
  time: timeConverter.timeToNumber({
    minutes: 5,
    seconds: 0
  }),
  questions: [],
  currentQuestionIdx: -1
};

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
   * @param {Array<Object>} data Исходные данные игры
   *
   * @return {GameState} Новое состояние игры
   */
  static generate(data) {
    let newGameState = new GameState();
    newGameState._lives = initState.lives;
    newGameState._time = initState.time;
    newGameState._questions = data.map((dataItem) => Object.assign({}, dataItem));
    newGameState._currentQuestionIdx = initState.currentQuestionIdx;
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
