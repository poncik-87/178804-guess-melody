import {ANSWER} from "../Consts";

/**
 * Функция подсчитывает счет игрока
 *
 * @param {Array<string>} data Данные ответов игрока
 * @param {number} lives Количество оставшихся жизней игрока
 * @return {number} Итоговый счет игрока (-1 в случае преждевременного проигрыша)
 */
export default function (data, lives) {
  if (data.length < 10 || lives <= 0) {
    return -1;
  }

  return data.reduce((acc, it) => {
    let ret = acc;
    switch (it) {
      case ANSWER.CORRECT:
        ret += 1;
        break;
      case ANSWER.FAST_CORRECT:
        ret += 2;
        break;
      case ANSWER.INCORRECT:
        ret -= 2;
    }
    return ret;
  }, 0);
}
