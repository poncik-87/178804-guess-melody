import assert from 'assert';
import getGameResultMessage from './getGameResultMessage';
import {GameResult, MAX_FAULTS_COUNT} from '../consts';

/**
 * Возвращает результаты игры в виде объекта
 *
 * @param {number} score Счет
 * @param {number} faults Количество ошибок игрока
 * @param {number} time Оставшееся время
 * @return {Object} Результаты игры в виде объекта
 */
const getUserResultObject = (score, faults, time) => ({score, faults, time});

describe(`getGameResultMessage`, () => {
  let currentUserResult;

  describe(`test game lost`, () => {
    it(`should return "time lost" game result`, () => {
      currentUserResult = getUserResultObject(1, 1, 0);
      assert.equal(GameResult.TIME_LOST, getGameResultMessage(currentUserResult));
    });

    it(`should return "faults lost" game result`, () => {
      currentUserResult = getUserResultObject(1, MAX_FAULTS_COUNT, 10);
      assert.equal(GameResult.FAULTS_LOST, getGameResultMessage(currentUserResult));
    });
  });

  describe(`test game win`, () => {
    let otherUsersResults;

    it(`should take first place on empty gamers list`, () => {
      otherUsersResults = [];
      currentUserResult = getUserResultObject(1, 1, 10);
      assert.equal(GameResult.win(1, 1, 0), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take first place`, () => {
      otherUsersResults = [
        getUserResultObject(-11, 1, 10),
        getUserResultObject(10, 2, 10),
        getUserResultObject(15, 1, 100)
      ];
      currentUserResult = getUserResultObject(20, 1, 10);
      assert.equal(GameResult.win(1, 4, 100), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take last place`, () => {
      otherUsersResults = [
        getUserResultObject(2, 1, 10),
        getUserResultObject(10, 2, 10),
        getUserResultObject(15, 1, 100)
      ];
      currentUserResult = getUserResultObject(1, 1, 10);
      assert.equal(GameResult.win(4, 4, 0), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take last place with negative score`, () => {
      otherUsersResults = [
        getUserResultObject(2, 1, 10),
        getUserResultObject(10, 2, 10),
        getUserResultObject(15, 1, 100)
      ];
      currentUserResult = getUserResultObject(-1, 1, 10);
      assert.equal(GameResult.win(4, 4, 0), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take 2 place of 3`, () => {
      otherUsersResults = [
        getUserResultObject(1, 1, 10),
        getUserResultObject(10, 2, 10)
      ];
      currentUserResult = getUserResultObject(5, 1, 10);
      assert.equal(GameResult.win(2, 3, 50), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take 2 place of 4`, () => {
      otherUsersResults = [
        getUserResultObject(1, 1, 10),
        getUserResultObject(2, 2, 10),
        getUserResultObject(10, 2, 10)
      ];
      currentUserResult = getUserResultObject(5, 1, 10);
      assert.equal(GameResult.win(2, 4, 66), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take 3 place of 4`, () => {
      otherUsersResults = [
        getUserResultObject(1, 1, 10),
        getUserResultObject(8, 2, 10),
        getUserResultObject(10, 2, 10)
      ];
      currentUserResult = getUserResultObject(5, 1, 10);
      assert.equal(GameResult.win(3, 4, 33), getGameResultMessage(currentUserResult, otherUsersResults));
    });
  });
});
