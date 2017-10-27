import {Answer} from "../consts";

/**
 * Функция подсчитывает счет игрока
 *
 * @param {number} lives Количество оставшихся жизней игрока
 * @param {Object} gameData Данные игры
 * @param {Array<Object>} gameData.questions Список вопросов текущей игры
 * @param {string} gameData.questions.answer Ответ игрока на вопрос
 *
 * @return {Object} Итоговый счет игрока в виде объекта с итоговым счетом и счетом быстрых ответов
 */
export default function getUserScore(lives, gameData) {
  if (lives <= 0) {
    return null;
  }

  const initScore = {
    totalScore: 0,
    fastAnswersScore: 0
  };

  return gameData.questions.reduce((acc, it) => {
    switch (it.answer) {
      case Answer.CORRECT:
        acc.totalScore = acc.totalScore + 1;
        break;
      case Answer.FAST_CORRECT:
        acc.totalScore = acc.totalScore + 2;
        acc.fastAnswersScore = acc.fastAnswersScore + 2;
        break;
      case Answer.INCORRECT:
        acc.totalScore = acc.totalScore - 2;
        break;
      default:
        break;
    }
    return acc;
  }, initScore);
}
