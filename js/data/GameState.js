import {Answer, QuestionType, MAX_FAULTS_COUNT} from "../consts";

import timeConverter from '../utils/timeConverter';

const initState = {
  faults: 0,
  time: timeConverter.timeToNumber({
    minutes: 5,
    seconds: 0
  }),
  questions: [],
  currentQuestionIdx: -1
};

/**
 * Класс состояния игры
 * Содержит количество ошибок игрока, время игры, и данные вопросов текущей игры
 */
export default class GameState {
  constructor() {
    this._onTimeChangedCallbackSet = new Set();
    this._onFaultsChangedCallbackSet = new Set();
  }

  /**
   * @return {number} Количество ошибок игрока
   */
  get faults() {
    return this._faults;
  }

  /**
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
    if (this._faults >= MAX_FAULTS_COUNT) {
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
   * Возвращает список url адресов песен
   */
  get audioSrcList() {
    let srcList = [];
    this._questions.forEach((dataItem) => {
      if (dataItem.type === QuestionType.ARTIST) {
        if (srcList.indexOf(dataItem.src) === -1) {
          srcList.push(dataItem.src);
        }
      } else if (dataItem.type === QuestionType.GENRE) {
        dataItem.answers.forEach((answer) => {
          if (srcList.indexOf(answer.src) === -1) {
            srcList.push(answer.src);
          }
        });
      }
    });
    return srcList;
  }

  /**
   * Функция увеличивает количество ошибок игрока на 1
   *
   * @return {GameState} Новое состояние игры
   */
  increaseFault() {
    let newGameState = GameState._copy(this);
    newGameState._faults = newGameState._faults + 1;

    // оповещение подписчиков об изменении модели
    for (let callback of this._onFaultsChangedCallbackSet) {
      callback(newGameState._faults);
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
   * Функция подписки на событие изменения количества ошибок игрока
   *
   * @param {Function} callback Колбэк обрабатывающий изменение количества ошибок игрока
   */
  subscribeOnFaultsChanged(callback) {
    this._onFaultsChangedCallbackSet.add(callback);
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
    newGameState._faults = initState.faults;
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
    newGameState._faults = oldGameState._faults;
    newGameState._time = oldGameState._time;
    newGameState._questions = oldGameState._questions.slice();
    newGameState._currentQuestionIdx = oldGameState._currentQuestionIdx;
    newGameState._onTimeChangedCallbackSet = new Set(oldGameState._onTimeChangedCallbackSet);
    newGameState._onFaultsChangedCallbackSet = new Set(oldGameState._onFaultsChangedCallbackSet);

    return newGameState;
  }
}
