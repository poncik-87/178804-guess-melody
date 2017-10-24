const MAX_LIVES_COUNT = 3;

/**
 * Функция преобразует количество жизней в число ошибок игрока
 * @param {number} lives Количество жизней
 * @return {number} Число совершенных ошибок
 */
export default function getMistakesCount(lives) {
  return MAX_LIVES_COUNT - lives;
}
