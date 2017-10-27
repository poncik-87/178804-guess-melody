import {GameResult} from '../consts';

/**
 * Функция возвращает результат игры в виде текстового сообщения
 *
 * @param {Object} currentUserResult Результаты текущего игрока
 * @param {number} currentUserResult.score Счет текущего игрока
 * @param {number} currentUserResult.lives Количество жизней текущего игрока
 * @param {number} currentUserResult.time Оставшееся время игры
 * @param {Array<Object>} otherUsersResults Результаты всех остальных игроков
 * @return {string} Результат игры
 */
export default function getGameResultMessage(currentUserResult, otherUsersResults) {
  if (currentUserResult.time <= 0) {
    return GameResult.TIME_LOST;
  }
  if (currentUserResult.lives === 0) {
    return GameResult.LIVES_LOST;
  }
  if (otherUsersResults.length === 0) {
    return GameResult.win(1, 1, 0);
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

  return GameResult.win(currentUserPlace, currentUsersCount, currentUserRating);
}
