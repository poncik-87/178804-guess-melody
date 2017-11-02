import assert from 'assert';
import {Answer, MAX_FAULTS_COUNT} from "../consts";
import GameState from './GameState';
import repeatTimes from '../utils/repeatTimes';

/**
 * Функция создает данные игры с заданным количеством ответов определенного типа и ошибок игрока
 *
 * @param {number} faults Количество ошибок игрока
 * @param {number} correctAnswersCount Количество правильных ответов
 * @param {number} fastCorrectAnswersCount Количество быстрых правильных ответов
 * @param {number} incorrectAnswersCount Количество неправильных ответов
 *
 * @return {GameState} Данные игры с заданными характеристиками
 */
const getSimulatedGameData = (faults, correctAnswersCount, fastCorrectAnswersCount, incorrectAnswersCount) => {
  const data = new Array(10).fill({});
  let gameState = GameState.generate(data);
  if (gameState.faults > faults) {
    // невалидное количество ошибок игрока
    return null;
  }

  while (gameState.faults < faults) {
    gameState = gameState.increaseFault();
  }

  repeatTimes(correctAnswersCount, () => {
    gameState = gameState.iterateQuestion().setQuestionAnswer(Answer.CORRECT);
  });
  repeatTimes(fastCorrectAnswersCount, () => {
    gameState = gameState.iterateQuestion().setQuestionAnswer(Answer.FAST_CORRECT);
  });
  repeatTimes(incorrectAnswersCount, () => {
    gameState = gameState.iterateQuestion().setQuestionAnswer(Answer.INCORRECT);
  });

  return gameState;
};

describe(`userScore`, () => {
  let gameState;
  let userScore;

  describe(`test data with less than ${MAX_FAULTS_COUNT} faults`, () => {
    it(`should return object with totalScore = 10 on 10 correct answers`, () => {
      gameState = getSimulatedGameData(MAX_FAULTS_COUNT - 1, 10, 0, 0);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };

      assert.deepEqual(userScore, gameState.userScore);
    });
    it(`should return object with totalScore = 20 and fastAnswersScore = 20 on 10 fast correct answers`, () => {
      gameState = getSimulatedGameData(MAX_FAULTS_COUNT - 1, 0, 10, 0);
      userScore = {
        totalScore: 20,
        fastAnswersScore: 20
      };

      assert.deepEqual(userScore, gameState.userScore);
    });
    it(`should return object with totalScore = -20 on 10 incorrect answers`, () => {
      gameState = getSimulatedGameData(MAX_FAULTS_COUNT - 1, 0, 0, 10);
      userScore = {
        totalScore: -20,
        fastAnswersScore: 0
      };

      assert.deepEqual(userScore, gameState.userScore);
    });
    it(`should return object with totalScore = 15 and fastAnswersScore = 10 on 5 correct and 5 fast-correct answers`, () => {
      gameState = getSimulatedGameData(MAX_FAULTS_COUNT - 1, 5, 5, 0);
      userScore = {
        totalScore: 15,
        fastAnswersScore: 10
      };

      assert.deepEqual(userScore, gameState.userScore);
    });
    it(`should return object with totalScore = -5 on 5 correct and 5 incorrect answers`, () => {
      gameState = getSimulatedGameData(MAX_FAULTS_COUNT - 1, 5, 0, 5);
      userScore = {
        totalScore: -5,
        fastAnswersScore: 0
      };
      assert.deepEqual(userScore, gameState.userScore);
    });
    it(`should return object with totalScore = 0 and fastAnswersScore = 10 on 5 fast correct and 5 incorrect answers`, () => {
      gameState = getSimulatedGameData(MAX_FAULTS_COUNT - 1, 0, 5, 5);
      userScore = {
        totalScore: 0,
        fastAnswersScore: 10
      };

      assert.deepEqual(userScore, gameState.userScore);
    });
  });

  describe(`test faultsCount with 10 correct answers`, () => {
    it(`should return null on ${MAX_FAULTS_COUNT} faults`, () => {
      gameState = getSimulatedGameData(MAX_FAULTS_COUNT, 10, 0, 0);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };
      assert.equal(null, gameState.userScore);
    });
    it(`should return null on more than ${MAX_FAULTS_COUNT} faults`, () => {
      gameState = getSimulatedGameData(MAX_FAULTS_COUNT + 1, 10, 0, 0);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };
      assert.equal(null, gameState.userScore);
    });
    it(`should return object with totalScore = 10 on less than ${MAX_FAULTS_COUNT} faults`, () => {
      gameState = getSimulatedGameData(MAX_FAULTS_COUNT - 1, 10, 0, 0);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };
      assert.deepEqual(userScore, gameState.userScore);
    });
  });
});
