import mainLevelArtistPage from '../components/mainLevelArtist/mainLevelArtistPage';
import mainLevelGenrePage from '../components/mainLevelGenre/mainLevelGenrePage';
import getArtistQuestion from './getArtistQuestion';
import getGenreQuestion from './getGenreQuestion';
import getRandomListElement from './getRandomListElement';
import gameData from '../data/gameData';

/**
 * Фабрика создания страницы игры с выбором артиста
 *
 * @param {Array<string>} gamerAnswers Список ответов игрока
 * @param {Object} gameState Состояние игры
 *
 * @return {HTMLElement}
 */
const mainLevelArtistPageFactory = (gamerAnswers, gameState) => {
  const questionObject = getArtistQuestion(gameData);
  return mainLevelArtistPage(gameState, questionObject, gamerAnswers);
};

/**
 * Фабрика создания страницы игры с выбором жанра
 *
 * @param {Array<string>} gamerAnswers Список ответов игрока
 * @param {Object} gameState Состояние игры
 *
 * @return {HTMLElement}
 */
const mainLevelGenrePageFactory = (gamerAnswers, gameState) => {
  const questionObject = getGenreQuestion(gameData);
  return mainLevelGenrePage(gameState, questionObject, gamerAnswers);
};

/**
 * Возвращает случайно выбранный экран игры
 *
 * @param {Array<string>} gamerAnswers Список ответов игрока
 * @param {Object} gameState Состояние игры
 *
 * @return {Function} Функция отрисовки экрана игры
 */
export default function getRandomLevelPage(gamerAnswers, gameState) {
  const ramdomPageFactory = getRandomListElement([mainLevelArtistPageFactory, mainLevelGenrePageFactory]);
  return ramdomPageFactory(gamerAnswers, gameState);
}
