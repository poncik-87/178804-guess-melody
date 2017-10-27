import {QuestionType} from '../consts';

import getRandomListElement from './getRandomListElement';

const ANSWER_VARIANTS_COUNT = 4;

/**
 * Функция возвращает случайно сформированный объект вопроса для категории "жанр"
 * Механизм случайной генерации:
 * -сначала из массива данных выбираются ANSWER_VARIANTS_COUNT случайных неповторяющихся объекта
 * -потом из них случайно выбирается правильный ответ для вопроса
 *
 * @param {Array<Object>} data Исходные данные игры
 * @param {string} data[].id Идентификатор песни
 * @param {string} data[].genre Жанр песни
 * @param {string} data[].src Url песни
 *
 * @return {Object} Объект вопроса категории "жанр"
 */
export default function getGenreQuestion(data) {
  // массив копируется, чтобы не влиять на внешние данные
  data = data.slice();

  let answers = [];
  for (let i = 0; i < ANSWER_VARIANTS_COUNT; i++) {
    const randomDataItem = getRandomListElement(data);
    // элемент массива удаляется из него, чтобы не было повторяющихся вариантов ответов
    data.splice(data.indexOf(randomDataItem), 1);

    answers.push({
      id: randomDataItem.id,
      src: randomDataItem.src,
      genre: randomDataItem.genre
    });
  }

  return {
    writeAnswerGenre: getRandomListElement(answers).genre,
    answers,
    type: QuestionType.GENRE
  };
}
