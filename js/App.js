import {QuestionType} from './consts';

import ArtistQuestionPage from './components/ArtistQuestionPage/ArtistQuestionPage';
import GenreQuestionPage from './components/GenreQuestionPage/GenreQuestionPage';
import ResultLoosePage from './components/ResultLoosePage/ResultLoosePage';
import ResultTimeoutPage from './components/ResultTimeoutPage/ResultTimeoutPage';
import ResultWinPage from './components/ResultWinPage/ResultWinPage';
import WelcomePage from './components/WelcomePage/WelcomePage';
import GameState from './data/GameState';
import getGameResultMessage from './utils/getGameResultMessage';

const PageId = {
  WELCOME: `welcome`,
  GAME: `game`,
  RESULT_TIMEOUT: `timeout`,
  RESULT_LOOSE: `loose`,
  RESULT_WIN: `win`
};

/**
 * Контейнер отрисовки игровых экранов
 */
class App {
  constructor() {
    window.onhashchange = this.onHashChanged.bind(this);
    this.onHashChanged();
  }

  onHashChanged() {
    const [pageId, params] = window.location.hash.replace(`#`, ``).split(`?`);
    const paramsObject = params && JSON.parse(params);
    switch (pageId) {
      case PageId.WELCOME:
        WelcomePage.init();
        break;
      case PageId.GAME:
        this.showNextPage(GameState.generate());
        break;
      case PageId.RESULT_LOOSE:
        ResultLoosePage.init(getGameResultMessage({lives: 0}));
        break;
      case PageId.RESULT_TIMEOUT:
        ResultTimeoutPage.init(getGameResultMessage({time: 0}));
        break;
      case PageId.RESULT_WIN:
        if (!paramsObject) {
          this.showWelcomePage();
          return;
        }

        const resultMessage = getGameResultMessage({
          score: paramsObject.totalScore,
          lives: paramsObject.lives,
          time: paramsObject.time
        }, []);

        ResultWinPage.init({
          lives: paramsObject.lives,
          time: paramsObject.time,
          totalScore: paramsObject.totalScore,
          fastAnswersScore: paramsObject.fastAnswersScore,
          resultMessage});
        break;
      default:
        break;
    }
  }
  /**
   * Показать страницу приветствия
   */
  showWelcomePage() {
    window.location.hash = PageId.WELCOME;
  }

  /**
   * Начать игру
   */
  startGame() {
    window.location.hash = PageId.GAME;
  }

  /**
   * Показать следующий экран
   *
   * @param {GameState} gameState Состояние игры
   */
  showNextPage(gameState) {
    if (gameState.time <= 0) {
      this.showResultTimeoutPage();
    } else if (gameState.lives <= 0) {
      this.showResultLoosePage();
    } else if (gameState.hasNextQuestion) {
      gameState = gameState.iterateQuestion();

      if (gameState.currentQuestion.type === QuestionType.ARTIST) {
        this.showArtistQuestionPage(gameState);
      } else if (gameState.currentQuestion.type === QuestionType.GENRE) {
        this.showGenreQuestionPage(gameState);
      }
    } else {
      this.showResultWinPage(gameState);
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
   */
  showResultLoosePage() {
    window.location.hash = PageId.RESULT_LOOSE;
  }

  /**
   * Показать страницу окончания времени
   */
  showResultTimeoutPage() {
    window.location.hash = PageId.RESULT_TIMEOUT;
  }

  /**
   * Показать страницу окончания времени
   *
   * @param {Object} gameState Состояние игры
   */
  showResultWinPage(gameState) {
    const paramsString = JSON.stringify({
      lives: gameState.lives,
      time: gameState.time,
      totalScore: gameState.userScore.totalScore,
      fastAnswersScore: gameState.userScore.fastAnswersScore
    });

    window.location.hash = `${PageId.RESULT_WIN}?${paramsString}`;
  }
}

export default new App();
