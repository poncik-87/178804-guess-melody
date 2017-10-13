import assert from 'assert';
import {ANSWER} from "../Consts";
import processUserScore from './processUserScore';

describe(`processUserScore`, () => {
  let data;

  describe(`test wrong data format`, () => {
    it(`should return -1 on empty data array`, () => {
      data = [];
      assert.equal(-1, processUserScore(data, 2));
    });
    it(`should return -1 on too small data array`, () => {
      data = new Array(3).fill(ANSWER.CORRECT);
      assert.equal(-1, processUserScore(data, 0));
    });
    it(`should return -1 on empty data array and 0 lives`, () => {
      data = [];
      assert.equal(-1, processUserScore(data, 0));
    });
  });

  describe(`test data with more than 0 live`, () => {
    it(`should return 10 on all correct answers`, () => {
      data = new Array(10).fill(ANSWER.CORRECT);
      assert.equal(10, processUserScore(data, 2));
    });
    it(`should return 20 on all fast correct answers`, () => {
      data = new Array(10).fill(ANSWER.FAST_CORRECT);
      assert.equal(20, processUserScore(data, 2));
    });
    it(`should return -20 on all incorrect answers`, () => {
      data = new Array(10).fill(ANSWER.INCORRECT);
      assert.equal(-20, processUserScore(data, 2));
    });
    it(`should return 15 on half correct and fast correct answers`, () => {
      data = new Array(5).fill(ANSWER.CORRECT).concat(new Array(5).fill(ANSWER.FAST_CORRECT));
      assert.equal(15, processUserScore(data, 2));
    });
    it(`should return -5 on half correct and incorrect answers`, () => {
      data = new Array(5).fill(ANSWER.CORRECT).concat(new Array(5).fill(ANSWER.INCORRECT));
      assert.equal(-5, processUserScore(data, 2));
    });
    it(`should return 0 on half fast correct and incorrect answers`, () => {
      data = new Array(5).fill(ANSWER.FAST_CORRECT).concat(new Array(5).fill(ANSWER.INCORRECT));
      assert.equal(0, processUserScore(data, 2));
    });
  });

  describe(`test livesCount with all correct answers`, () => {
    beforeEach(() => {
      data = new Array(10).fill(ANSWER.CORRECT);
    });

    it(`should return -1 on 0 lives`, () => {
      assert.equal(-1, processUserScore(data, 0));
    });
    it(`should return -1 on negative lives`, () => {
      assert.equal(-1, processUserScore(data, -1));
    });
    it(`should return 10 on more than 0 live`, () => {
      assert.equal(10, processUserScore(data, 1));
    });
  });
});
