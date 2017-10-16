import {Answer} from "../consts";

/**
 * Функция подсчитывает счет игрока
 *
 * @param {Array<string>} data Данные ответов игрока
 * @param {number} lives Количество оставшихся жизней игрока
 * @return {number} Итоговый счет игрока (-1 в случае преждевременного проигрыша)
 */
export default function getUserScore(data, lives) {
  if (data.length < 10 || lives <= 0) {
    return -1;
  }

  return data.reduce((acc, it) => {
    let ret = acc;
    switch (it) {
      case Answer.CORRECT:
        ret += 1;
        break;
      case Answer.FAST_CORRECT:
        ret += 2;
        break;
      case Answer.INCORRECT:
        ret -= 2;
    }
    return ret;
  }, 0);
}
