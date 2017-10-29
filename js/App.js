import ArtistQuestionPage from './components/ArtistQuestionPage/ArtistQuestionPage';
import GenreQuestionPage from './components/GenreQuestionPage/GenreQuestionPage';
import ResultLoosePage from './components/ResultLoosePage/ResultLoosePage';
import ResultTimeoutPage from './components/ResultTimeoutPage/ResultTimeoutPage';
import ResultWinPage from './components/ResultWinPage/ResultWinPage';
import WelcomePage from './components/WelcomePage/WelcomePage';

/**
 * Класс контейнер отрисовки игровых экранов
 */
class App {
  /**
   * Показать страницу приветствия
   */
  showWelcomePage() {
    WelcomePage.init();
  }

  /**
   * Показать страницу вопроса автора песни
   *
   * @param {Object} gameState Состояние игры
   */
  showArtistQuestionPage(gameState) {
    ArtistQuestionPage.init(gameState);
  }

  /**
   * Показать страницу вопроса жанра песни
   *
   * @param {Object} gameState Состояние игры
   */
  showGenreQuestionPage(gameState) {
    GenreQuestionPage.init(gameState);
  }

  /**
   * Показать страницу проигрыша
   *
   * @param {string} resultMessage Сообщение результата игры
   */
  showResultLoosePage(resultMessage) {
    ResultLoosePage.init(resultMessage);
  }

  /**
   * Показать страницу окончания времени
   *
   * @param {string} resultMessage Сообщение результата игры
   */
  showResultTimeoutPage(resultMessage) {
    ResultTimeoutPage.init(resultMessage);
  }

  /**
   * Показать страницу окончания времени
   *
   * @param {number} lives Количество жизней игрока
   * @param {number} time Оставшееся время игры
   * @param {Object} userScore Счет игрока
   * @param {string} resultMessage Сообщение результата игры
   */
  showResultWinPage({lives, time, userScore, resultMessage}) {
    ResultWinPage.init({lives, time, userScore, resultMessage});
  }
}

export default new App();
