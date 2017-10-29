import {QuestionType} from './consts';

import ArtistQuestionPage from './components/ArtistQuestionPage/ArtistQuestionPage';
import GenreQuestionPage from './components/GenreQuestionPage/GenreQuestionPage';
import ResultLoosePage from './components/ResultLoosePage/ResultLoosePage';
import ResultTimeoutPage from './components/ResultTimeoutPage/ResultTimeoutPage';
import ResultWinPage from './components/ResultWinPage/ResultWinPage';
import WelcomePage from './components/WelcomePage/WelcomePage';
import GameState from './data/GameState';
import getGameResultMessage from './utils/getGameResultMessage';

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
   * Начать игру
   */
  startGame() {
    this.showNextPage(GameState.generate());
  }

  /**
   * Показать следующий экран
   *
   * @param {GameState} gameState Состояние игры
   */
  showNextPage(gameState) {
    if (gameState.time <= 0) {
      this.showResultTimeoutPage(getGameResultMessage({time: gameState.time}));
    } else if (gameState.lives <= 0) {
      this.showResultLoosePage(getGameResultMessage({lives: gameState.lives}));
    } else if (gameState.hasNextQuestion) {
      gameState = gameState.iterateQuestion();

      if (gameState.currentQuestion.type === QuestionType.ARTIST) {
        this.showArtistQuestionPage(gameState);
      } else if (gameState.currentQuestion.type === QuestionType.GENRE) {
        this.showGenreQuestionPage(gameState);
      }
    } else {
      const userScore = gameState.userScore;
      // TODO: вторым параметром передавать результаты других игроков
      const resultMessage = getGameResultMessage({
        score: userScore.totalScore,
        lives: gameState.lives,
        time: gameState.time
      }, []);

      this.showResultWinPage({
        lives: gameState.lives,
        time: gameState.time,
        userScore,
        resultMessage
      });
    }
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
