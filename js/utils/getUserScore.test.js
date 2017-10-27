import assert from 'assert';
import {Answer} from "../consts";
import getUserScore from './getUserScore';
import GameData from '../data/GameData';
import repeatTimes from '../utils/repeatTimes';

/**
 * Функция создает данные игры с заданным количеством ответов определенного типа
 *
 * @param {number} correctAnswersCount Количество правильных ответов
 * @param {number} fastCorrectAnswersCount Количество быстрых правильных ответов
 * @param {number} incorrectAnswersCount Количество неправильных ответов
 *
 * @return {GameData} Данные игры с проставленными ответами
 */
const getSimulatedGameData = (correctAnswersCount, fastCorrectAnswersCount, incorrectAnswersCount) => {
  let gameData = GameData.generate();
  repeatTimes(correctAnswersCount, () => {
    gameData = gameData.iterateQuestion().setQuestionAnswer(Answer.CORRECT);
  });
  repeatTimes(fastCorrectAnswersCount, () => {
    gameData = gameData.iterateQuestion().setQuestionAnswer(Answer.FAST_CORRECT);
  });
  repeatTimes(incorrectAnswersCount, () => {
    gameData = gameData.iterateQuestion().setQuestionAnswer(Answer.INCORRECT);
  });

  return gameData;
};

describe(`getUserScore`, () => {
  let data;
  let userScore;

  describe(`test data with more than 0 live`, () => {
    it(`should return object with totalScore = 10 on 10 correct answers`, () => {
      data = getSimulatedGameData(10, 0, 0);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };

      assert.deepEqual(userScore, getUserScore(1, data));
    });
    it(`should return object with totalScore = 20 and fastAnswersScore = 20 on 10 fast correct answers`, () => {
      data = getSimulatedGameData(0, 10, 0);
      userScore = {
        totalScore: 20,
        fastAnswersScore: 20
      };

      assert.deepEqual(userScore, getUserScore(2, data));
    });
    it(`should return object with totalScore = -20 on 10 incorrect answers`, () => {
      data = getSimulatedGameData(0, 0, 10);
      userScore = {
        totalScore: -20,
        fastAnswersScore: 0
      };

      assert.deepEqual(userScore, getUserScore(2, data));
    });
    it(`should return object with totalScore = 15 and fastAnswersScore = 10 on 5 correct and 5 fast-correct answers`, () => {
      data = getSimulatedGameData(5, 5, 0);
      userScore = {
        totalScore: 15,
        fastAnswersScore: 10
      };

      assert.deepEqual(userScore, getUserScore(2, data));
    });
    it(`should return object with totalScore = -5 on 5 correct and 5 incorrect answers`, () => {
      data = getSimulatedGameData(5, 0, 5);
      userScore = {
        totalScore: -5,
        fastAnswersScore: 0
      };
      assert.deepEqual(userScore, getUserScore(2, data));
    });
    it(`should return object with totalScore = 0 and fastAnswersScore = 10 on 5 fast correct and 5 incorrect answers`, () => {
      data = getSimulatedGameData(0, 5, 5);
      userScore = {
        totalScore: 0,
        fastAnswersScore: 10
      };

      assert.deepEqual(userScore, getUserScore(2, data));
    });
  });

  describe(`test livesCount with 10 correct answers`, () => {
    beforeEach(() => {
      data = getSimulatedGameData(10, 0, 0);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };
    });

    it(`should return null on 0 lives`, () => {
      assert.equal(null, getUserScore(0, data));
    });
    it(`should return null on negative lives`, () => {
      assert.equal(null, getUserScore(-1, data));
    });
    it(`should return object with totalScore = 10 on more than 0 live`, () => {
      assert.deepEqual(userScore, getUserScore(1, data));
    });
  });
});
