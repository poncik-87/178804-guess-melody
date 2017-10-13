import {GAME_RESULT} from '../Consts';

/**
 * Функция возвращает результат игры в виде текстового сообщения
 *
 * @param {Object} currentUserResult Результаты текущего игрока
 * @param {number} currentUserResult.score Счет текущего игрока
 * @param {number} currentUserResult.lives Количество жизней текущего игрока
 * @param {number} currentUserResult.time Оставшееся время текущего игрока
 * @param {Array} otherUsersResults Результаты всех остальных игроков
 * @return {string} Результат игры
 */
export default function (currentUserResult, otherUsersResults) {
  if (currentUserResult.time <= 0) {
    return GAME_RESULT.TIME_LOST;
  }
  if (currentUserResult.lives === 0) {
    return GAME_RESULT.LIVES_LOST;
  }
  if (otherUsersResults.length === 0) {
    return GAME_RESULT.win(1, 1, 0);
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

  return GAME_RESULT.win(currentUserPlace, currentUsersCount, currentUserRating);
}
