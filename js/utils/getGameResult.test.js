import assert from 'assert';
import getGameResult from './getGameResult';
import {GAME_RESULT} from '../Consts';

/**
 * Возвращает результаты игры в виде объекта
 *
 * @param {number} score Счет
 * @param {number} lives Количество оставшихся жизней
 * @param {number} time Оставшееся время
 * @return {Object} Результаты игры в виде объекта
 */
const getUserResultObject = (score, lives, time) => ({score, lives, time});

describe(`getGameResult`, () => {
  let currentUserResult;

  describe(`test game lost`, () => {
    it(`should return "time lost" game result`, () => {
      currentUserResult = getUserResultObject(1, 1, 0);
      assert.equal(GAME_RESULT.TIME_LOST, getGameResult(currentUserResult));
    });

    it(`should return "lives lost" game result`, () => {
      currentUserResult = getUserResultObject(1, 0, 10);
      assert.equal(GAME_RESULT.LIVES_LOST, getGameResult(currentUserResult));
    });
  });

  describe(`test game win`, () => {
    let otherUsersResults;

    it(`should take first place on empty gamers list`, () => {
      otherUsersResults = [];
      currentUserResult = getUserResultObject(1, 1, 10);
      assert.equal(GAME_RESULT.win(1, 1, 0), getGameResult(currentUserResult, otherUsersResults));
    });

    it(`should take first place`, () => {
      otherUsersResults = [
        getUserResultObject(-11, 1, 10),
        getUserResultObject(10, 2, 10),
        getUserResultObject(15, 3, 100)
      ];
      currentUserResult = getUserResultObject(20, 1, 10);
      assert.equal(GAME_RESULT.win(1, 4, 100), getGameResult(currentUserResult, otherUsersResults));
    });

    it(`should take last place`, () => {
      otherUsersResults = [
        getUserResultObject(2, 1, 10),
        getUserResultObject(10, 2, 10),
        getUserResultObject(15, 3, 100)
      ];
      currentUserResult = getUserResultObject(1, 1, 10);
      assert.equal(GAME_RESULT.win(4, 4, 0), getGameResult(currentUserResult, otherUsersResults));
    });

    it(`should take last place with negative score`, () => {
      otherUsersResults = [
        getUserResultObject(2, 1, 10),
        getUserResultObject(10, 2, 10),
        getUserResultObject(15, 3, 100)
      ];
      currentUserResult = getUserResultObject(-1, 1, 10);
      assert.equal(GAME_RESULT.win(4, 4, 0), getGameResult(currentUserResult, otherUsersResults));
    });

    it(`should take 2 place of 3`, () => {
      otherUsersResults = [
        getUserResultObject(1, 1, 10),
        getUserResultObject(10, 2, 10)
      ];
      currentUserResult = getUserResultObject(5, 1, 10);
      assert.equal(GAME_RESULT.win(2, 3, 50), getGameResult(currentUserResult, otherUsersResults));
    });

    it(`should take 2 place of 4`, () => {
      otherUsersResults = [
        getUserResultObject(1, 1, 10),
        getUserResultObject(2, 2, 10),
        getUserResultObject(10, 2, 10)
      ];
      currentUserResult = getUserResultObject(5, 1, 10);
      assert.equal(GAME_RESULT.win(2, 4, 66), getGameResult(currentUserResult, otherUsersResults));
    });

    it(`should take 3 place of 4`, () => {
      otherUsersResults = [
        getUserResultObject(1, 1, 10),
        getUserResultObject(8, 2, 10),
        getUserResultObject(10, 2, 10)
      ];
      currentUserResult = getUserResultObject(5, 1, 10);
      assert.equal(GAME_RESULT.win(3, 4, 33), getGameResult(currentUserResult, otherUsersResults));
    });
  });
});
