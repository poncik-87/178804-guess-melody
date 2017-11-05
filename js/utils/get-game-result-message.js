import {GameResult, MAX_FAULTS_COUNT} from '../consts';

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

/**
 * Функция возвращает результат игры в виде текстового сообщения
 *
 * @param {Object} currentUserResult Результаты текущего игрока
 * @param {number} currentUserResult.score Счет текущего игрока
 * @param {number} currentUserResult.faults Количество ошибок текущего игрока
 * @param {number} currentUserResult.time Оставшееся время игры
 * @param {Array<Object>} otherUsersResults Результаты всех остальных игроков
 * @return {string} Результат игры
 */
export default function getGameResultMessage(currentUserResult, otherUsersResults) {
  if (currentUserResult.time <= 0) {
    return GameResult.TIME_LOST;
  }
  if (currentUserResult.faults >= MAX_FAULTS_COUNT) {
    return GameResult.FAULTS_LOST;
  }
  if (otherUsersResults.length === 0) {
    return gameResultMessage(1, 1, 0);
  }

  // копирование массива для того, чтобы не менять внешних данных
  const usersResults = otherUsersResults.slice();
  usersResults.push(currentUserResult);
  usersResults.sort((first, second) => second.score - first.score);

  const currentUserPlace = usersResults.indexOf(currentUserResult) + 1;
  const currentUsersCount = usersResults.length;
  const otherGamersCount = otherUsersResults.length;
  const currentUserRating =
    Math.floor((currentUsersCount - currentUserPlace) * 100 / otherGamersCount);

  return gameResultMessage(currentUserPlace, currentUsersCount, currentUserRating);
}
