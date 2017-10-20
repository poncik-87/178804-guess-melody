import assert from 'assert';
import {Answer} from "../consts";
import getUserScore from './getUserScore';

describe(`getUserScore`, () => {
  let data;
  let userScore;

  describe(`test wrong data format`, () => {
    it(`should return nyll on empty data array`, () => {
      data = [];
      assert.equal(null, getUserScore(data, 2));
    });
    it(`should return null on too small data array`, () => {
      data = new Array(3).fill(Answer.CORRECT);
      assert.equal(null, getUserScore(data, 0));
    });
    it(`should return null on empty data array and 0 lives`, () => {
      data = [];
      assert.equal(null, getUserScore(data, 0));
    });
  });

  describe(`test data with more than 0 live`, () => {
    it(`should return object with totalScore = 10 on all correct answers`, () => {
      data = new Array(10).fill(Answer.CORRECT);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };

      assert.deepEqual(userScore, getUserScore(data, 2));
    });
    it(`should return object with totalScore = 20 and fastAnswersScore = 20 on all fast correct answers`, () => {
      data = new Array(10).fill(Answer.FAST_CORRECT);
      userScore = {
        totalScore: 20,
        fastAnswersScore: 20
      };

      assert.deepEqual(userScore, getUserScore(data, 2));
    });
    it(`should return object with totalScore = -20 on all incorrect answers`, () => {
      data = new Array(10).fill(Answer.INCORRECT);
      userScore = {
        totalScore: -20,
        fastAnswersScore: 0
      };

      assert.deepEqual(userScore, getUserScore(data, 2));
    });
    it(`should return object with totalScore = 15 and fastAnswersScore = 10 on 5 correct and 5 fast-correct answers`, () => {
      data = new Array(5).fill(Answer.CORRECT).concat(new Array(5).fill(Answer.FAST_CORRECT));
      userScore = {
        totalScore: 15,
        fastAnswersScore: 10
      };

      assert.deepEqual(userScore, getUserScore(data, 2));
    });
    it(`should return object with totalScore = -5 on 5 correct and 5 incorrect answers`, () => {
      data = new Array(5).fill(Answer.CORRECT).concat(new Array(5).fill(Answer.INCORRECT));
      userScore = {
        totalScore: -5,
        fastAnswersScore: 0
      };
      assert.deepEqual(userScore, getUserScore(data, 2));
    });
    it(`should return object with totalScore = 0 and fastAnswersScore = 10 on 5 fast correct and 5 incorrect answers`, () => {
      data = new Array(5).fill(Answer.FAST_CORRECT).concat(new Array(5).fill(Answer.INCORRECT));
      userScore = {
        totalScore: 0,
        fastAnswersScore: 10
      };

      assert.deepEqual(userScore, getUserScore(data, 2));
    });
  });

  describe(`test livesCount with 10 correct answers`, () => {
    beforeEach(() => {
      data = new Array(10).fill(Answer.CORRECT);
      userScore = {
        totalScore: 10,
        fastAnswersScore: 0
      };
    });

    it(`should return null on 0 lives`, () => {
      assert.equal(null, getUserScore(data, 0));
    });
    it(`should return null on negative lives`, () => {
      assert.equal(null, getUserScore(data, -1));
    });
    it(`should return object with totalScore = 10 on more than 0 live`, () => {
      assert.deepEqual(userScore, getUserScore(data, 1));
    });
  });
});
