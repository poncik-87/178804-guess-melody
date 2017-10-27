import {QuestionType} from '../consts';

import getRandomListElement from './getRandomListElement';

const ANSWER_VARIANTS_COUNT = 3;

/**
 * Функция возвращает случайно сформированный объект вопроса для категории "артист"
 * Механизм случайной генерации:
 * -сначала из массива данных выбираются ANSWER_VARIANTS_COUNT случайных неповторяющихся объекта
 * -потом из них случайно выбирается правильный ответ для вопроса
 *
 * @param {Array<Object>} data Исходные данные игры
 * @param {string} data[].id Идентификатор песни
 * @param {string} data[].artist Имя исполнителя
 * @param {string} data[].image Url картинки исполнителя
 * @param {string} data[].src Url песни
 *
 * @return {Object} Объект вопроса категории "артист"
 */
export default function getArtistQuestion(data) {
  // массив копируется, чтобы не влиять на внешние данные
  data = data.slice();

  let answers = {};
  for (let i = 0; i < ANSWER_VARIANTS_COUNT; i++) {
    const randomDataItem = getRandomListElement(data);
    // элемент массива удаляется из него, чтобы не было повторяющихся вариантов ответов
    data.splice(data.indexOf(randomDataItem), 1);

    answers[randomDataItem.id] = {
      artist: randomDataItem.artist,
      image: randomDataItem.image,
      src: randomDataItem.src
    };
  }

  return {
    writeAnswerId: getRandomListElement(Object.keys(answers)),
    answers,
    type: QuestionType.ARTIST
  };
}
