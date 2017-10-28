import assert from 'assert';
import {Answer} from "../consts";
import GameState from './GameState';
import repeatTimes from '../utils/repeatTimes';

/**
 * Функция создает данные игры с заданным количеством ответов определенного типа и жизней
 *
 * @param {number} lives Количество жизней игрока
 * @param {number} correctAnswersCount Количество правильных ответов
 * @param {number} fastCorrectAnswersCount Количество быстрых правильных ответов
 * @param {number} incorrectAnswersCount Количество неправильных ответов
 *
 * @return {GameState} Данные игры с заданными характеристиками
 */
const getSimulatedGameData = (lives, correctAnswersCount, fastCorrectAnswersCount, incorrectAnswersCount) => {
  let gameState = GameState.generate();
  if (gameState.lives < lives) {
    // невалидное количество жизней
    return null;
  }

  while (gameState.lives > lives) {
    gameState = gameState.dropLive();
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

  describe(`test data with more than 0 live`, () => {
    it(`should return object with totalScore = 10 on 10 correct answers`, () => {
      gameState = getSimulatedGameData(1, 10, 0, 0);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };

      assert.deepEqual(userScore, gameState.userScore);
    });
    it(`should return object with totalScore = 20 and fastAnswersScore = 20 on 10 fast correct answers`, () => {
      gameState = getSimulatedGameData(2, 0, 10, 0);
      userScore = {
        totalScore: 20,
        fastAnswersScore: 20
      };

      assert.deepEqual(userScore, gameState.userScore);
    });
    it(`should return object with totalScore = -20 on 10 incorrect answers`, () => {
      gameState = getSimulatedGameData(2, 0, 0, 10);
      userScore = {
        totalScore: -20,
        fastAnswersScore: 0
      };

      assert.deepEqual(userScore, gameState.userScore);
    });
    it(`should return object with totalScore = 15 and fastAnswersScore = 10 on 5 correct and 5 fast-correct answers`, () => {
      gameState = getSimulatedGameData(2, 5, 5, 0);
      userScore = {
        totalScore: 15,
        fastAnswersScore: 10
      };

      assert.deepEqual(userScore, gameState.userScore);
    });
    it(`should return object with totalScore = -5 on 5 correct and 5 incorrect answers`, () => {
      gameState = getSimulatedGameData(2, 5, 0, 5);
      userScore = {
        totalScore: -5,
        fastAnswersScore: 0
      };
      assert.deepEqual(userScore, gameState.userScore);
    });
    it(`should return object with totalScore = 0 and fastAnswersScore = 10 on 5 fast correct and 5 incorrect answers`, () => {
      gameState = getSimulatedGameData(2, 0, 5, 5);
      userScore = {
        totalScore: 0,
        fastAnswersScore: 10
      };

      assert.deepEqual(userScore, gameState.userScore);
    });
  });

  describe(`test livesCount with 10 correct answers`, () => {
    it(`should return null on 0 lives`, () => {
      gameState = getSimulatedGameData(0, 10, 0, 0);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };
      assert.equal(null, gameState.userScore);
    });
    it(`should return null on negative lives`, () => {
      gameState = getSimulatedGameData(-1, 10, 0, 0);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };
      assert.equal(null, gameState.userScore);
    });
    it(`should return object with totalScore = 10 on more than 0 live`, () => {
      gameState = getSimulatedGameData(1, 10, 0, 0);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };
      assert.deepEqual(userScore, gameState.userScore);
    });
  });
});
