import repeatTimes from '../utils/repeatTimes';
import getArtistQuestion from '../utils/getArtistQuestion';
import getGenreQuestion from '../utils/getGenreQuestion';
import getRandomListElement from '../utils/getRandomListElement';

const GAME_LENGTH = 10;

/**
 * Исходные данные игры
 */
const data = [
  {
    id: `1`,
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    id: `2`,
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    id: `3`,
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    id: `4`,
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    id: `5`,
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    id: `6`,
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];

export default class GameData {
  /**
   * @return {Array<Object>} Возвращает список вопросов текущей игры
   */
  get questions() {
    return this._questions;
  }

  /**
   * @return {Object} Возвращает объект текущего вопроса
   */
  get currentQuestion() {
    return this._questions[this._currentQuestionIdx];
  }

  /**
   * @return {boolean} Признак того, есть ли еще неотвеченные вопросы
   */
  get hasNextQuestion() {
    return this._currentQuestionIdx + 1 < this._questions.length;
  }

  /**
   * Функция генерации игровых данных
   * Индекс текущего вопроса устанавливается на -1, нужно его сдвинуть, чтобы начать работать с данными
   *
   * @return {GameData} Возвращает новый объект игровых данных
   */
  static generate() {
    let newGameData = new GameData();
    newGameData._currentQuestionIdx = -1;
    newGameData._questions = [];
    repeatTimes(GAME_LENGTH, () => {
      const getQuestion = getRandomListElement([getArtistQuestion, getGenreQuestion]);
      newGameData._questions.push(getQuestion(data));
    });

    return newGameData;
  }

  /**
   * Функция перемещает текущий вопрос игровых данных
   *
   * @return {GameData} Возвращает новый объект игровых данных с перемещенным индексом текущего вопроса
   */
  iterateQuestion() {
    let newGameData = new GameData();
    newGameData._questions = this._questions;
    newGameData._currentQuestionIdx = this._currentQuestionIdx + 1;

    return newGameData;
  }

  /**
   * Функция назначает ответ на текущий вопрос
   *
   * @param {string} answer Ответ на текущий вопрос
   * @return {GameData} Возвращает новый объект игровых данных с внесенным ответом на вопрос
   */
  setQuestionAnswer(answer) {
    let newGameData = new GameData();
    newGameData._questions = this._questions;
    newGameData._currentQuestionIdx = this._currentQuestionIdx;
    newGameData._questions[newGameData._currentQuestionIdx].answer = answer;

    return newGameData;
  }
}
