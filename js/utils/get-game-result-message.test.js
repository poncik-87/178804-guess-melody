import assert from 'assert';
import getGameResultMessage from './get-game-result-message';
import {GameResult, MAX_FAULTS_COUNT} from '../consts';

/**
 * Возвращает результаты игры в виде объекта
 *
 * @param {number} score Счет
 * @param {number} faults Количество ошибок игрока
 * @param {number} time Оставшееся время
 * @return {Object} Результаты игры в виде объекта
 */
function getUserResultObject(score, faults, time) {
  return {score, faults, time};
}

/**
 * Возвращает текст сообщения победы
 *
 * @param {number} place Место, занятое игроком
 * @param {number} gamersCount Количество игроков в статистике
 * @param {number} rating Рейтинг игрока
 * @return {string} Текст сообщения победы
 */
function gameResultMessage(place, gamersCount, rating) {
  return `Вы заняли ${place}-ое место из ${gamersCount} игроков. Это лучше чем у ${rating}% игроков`;
}

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
      assert.equal(gameResultMessage(1, 1, 0), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take first place`, () => {
      otherUsersResults = [
        getUserResultObject(-11, 1, 10),
        getUserResultObject(10, 2, 10),
        getUserResultObject(15, 1, 100)
      ];
      currentUserResult = getUserResultObject(20, 1, 10);
      assert.equal(gameResultMessage(1, 4, 100), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take last place`, () => {
      otherUsersResults = [
        getUserResultObject(2, 1, 10),
        getUserResultObject(10, 2, 10),
        getUserResultObject(15, 1, 100)
      ];
      currentUserResult = getUserResultObject(1, 1, 10);
      assert.equal(gameResultMessage(4, 4, 0), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take last place with negative score`, () => {
      otherUsersResults = [
        getUserResultObject(2, 1, 10),
        getUserResultObject(10, 2, 10),
        getUserResultObject(15, 1, 100)
      ];
      currentUserResult = getUserResultObject(-1, 1, 10);
      assert.equal(gameResultMessage(4, 4, 0), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take 2 place of 3`, () => {
      otherUsersResults = [
        getUserResultObject(1, 1, 10),
        getUserResultObject(10, 2, 10)
      ];
      currentUserResult = getUserResultObject(5, 1, 10);
      assert.equal(gameResultMessage(2, 3, 50), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take 2 place of 4`, () => {
      otherUsersResults = [
        getUserResultObject(1, 1, 10),
        getUserResultObject(2, 2, 10),
        getUserResultObject(10, 2, 10)
      ];
      currentUserResult = getUserResultObject(5, 1, 10);
      assert.equal(gameResultMessage(2, 4, 66), getGameResultMessage(currentUserResult, otherUsersResults));
    });

    it(`should take 3 place of 4`, () => {
      otherUsersResults = [
        getUserResultObject(1, 1, 10),
        getUserResultObject(8, 2, 10),
        getUserResultObject(10, 2, 10)
      ];
      currentUserResult = getUserResultObject(5, 1, 10);
      assert.equal(gameResultMessage(3, 4, 33), getGameResultMessage(currentUserResult, otherUsersResults));
    });
  });
});
