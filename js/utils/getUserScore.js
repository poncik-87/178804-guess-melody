import {Answer} from "../consts";

/**
 * Функция подсчитывает счет игрока
 *
 * @param {Array<string>} data Данные ответов игрока
 * @param {number} lives Количество оставшихся жизней игрока
 *
 * @return {Object} Итоговый счет игрока в виде объекта с итоговым счетом и счетом быстрых ответов
 */
export default function getUserScore(data, lives) {
  if (data.length < 10 || lives <= 0) {
    return null;
  }

  const initScore = {
    totalScore: 0,
    fastAnswersScore: 0
  };

  return data.reduce((acc, it) => {
    switch (it) {
      case Answer.CORRECT:
        acc.totalScore = acc.totalScore + 1;
        break;
      case Answer.FAST_CORRECT:
        acc.totalScore = acc.totalScore + 2;
        acc.fastAnswersScore = acc.fastAnswersScore + 2;
        break;
      case Answer.INCORRECT:
        acc.totalScore = acc.totalScore - 2;
    }
    return acc;
  }, initScore);
}
