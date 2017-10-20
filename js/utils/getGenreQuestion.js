import getRandomListElement from './getRandomListElement';

const ANSWER_VARIANTS_COUNT = 4;

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
    answers
  };
}
