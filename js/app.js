import {QuestionType, MAX_FAULTS_COUNT} from './consts';

import artistQuestionPage from './components/ArtistQuestionPage/artist-question-page';
import genreQuestionPage from './components/GenreQuestionPage/genre-question-page';
import resultLoosePage from './components/ResultLoosePage/result-loose-page';
import resultTimeoutPage from './components/ResultTimeoutPage/result-timeout-page';
import resultWinPage from './components/ResultWinPage/result-win-page';
import welcomePage from './components/WelcomePage/welcome-page';
import loadingPage from './components/LoadingPage/loading-page';
import GameState from './data/game-state';
import loader from './loader';
import adaptServerData from './utils/adapt-server-data';

const PageId = {
  WELCOME: `welcome`,
  GAME: `game`,
  RESULT_TIMEOUT: `timeout`,
  RESULT_LOOSE: `loose`,
  RESULT_WIN: `win`
};

const SERVER_GAME_DATA_URL = `questions`;
const SERVER_STATS_URL = `stats/AlexeyKomarov178804`;

/**
 * Контейнер отрисовки игровых экранов
 */
class App {
  constructor() {
    window.onhashchange = this.onHashChanged.bind(this);

    loadingPage.init();
    loader.
        load(SERVER_GAME_DATA_URL).
        then(adaptServerData).
        then((data) => {
          this._gameState = GameState.generate(data);
          this.onHashChanged();
        });
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
      App.showResultTimeoutPage();
    } else if (gameState.faults >= MAX_FAULTS_COUNT) {
      App.showResultLoosePage();
    } else if (gameState.hasNextQuestion) {
      gameState = gameState.iterateQuestion();

      if (gameState.currentQuestion.type === QuestionType.ARTIST) {
        App.showArtistQuestionPage(gameState);
      } else if (gameState.currentQuestion.type === QuestionType.GENRE) {
        App.showGenreQuestionPage(gameState);
      }
    } else {
      App.showResultWinPage(gameState);
    }
  }

  /**
   * Обработчик изменения хеша
   */
  onHashChanged() {
    const [pageId, params] = window.location.hash.replace(`#`, ``).split(`?`);
    const paramsObject = params && JSON.parse(params);
    switch (pageId) {
      case PageId.WELCOME:
        welcomePage.init();
        break;
      case PageId.GAME:
        this.showNextPage(this._gameState);
        break;
      case PageId.RESULT_LOOSE:
        resultLoosePage.init();
        break;
      case PageId.RESULT_TIMEOUT:
        resultTimeoutPage.init();
        break;
      case PageId.RESULT_WIN:
        if (!paramsObject) {
          this.showWelcomePage();
          return;
        }

        loadingPage.init();
        loader.
            load(SERVER_STATS_URL).
            then((statsData) => {
              resultWinPage.init({
                faults: paramsObject.faults,
                time: paramsObject.time,
                totalScore: paramsObject.totalScore,
                fastAnswersScore: paramsObject.fastAnswersScore,
                statsData});
            });
        break;
      default:
        break;
    }
  }

  /**
   * Показать страницу вопроса автора песни
   *
   * @param {Object} gameState Состояние игры
   */
  static showArtistQuestionPage(gameState) {
    artistQuestionPage.init(gameState);
  }

  /**
   * Показать страницу вопроса жанра песни
   *
   * @param {Object} gameState Состояние игры
   */
  static showGenreQuestionPage(gameState) {
    genreQuestionPage.init(gameState);
  }

  /**
   * Показать страницу проигрыша
   */
  static showResultLoosePage() {
    window.location.hash = PageId.RESULT_LOOSE;
  }

  /**
   * Показать страницу окончания времени
   */
  static showResultTimeoutPage() {
    window.location.hash = PageId.RESULT_TIMEOUT;
  }

  /**
   * Показать страницу окончания времени
   *
   * @param {Object} gameState Состояние игры
   */
  static showResultWinPage(gameState) {
    const statsData = {
      faults: gameState.faults,
      time: gameState.time,
      score: gameState.userScore.totalScore
    };
    const resultData = {
      faults: gameState.faults,
      time: gameState.time,
      totalScore: gameState.userScore.totalScore,
      fastAnswersScore: gameState.userScore.fastAnswersScore
    };

    loadingPage.init();
    loader.
        save(statsData, SERVER_STATS_URL).
        then(() => {
          const paramsString = JSON.stringify(resultData);
          window.location.hash = `${PageId.RESULT_WIN}?${paramsString}`;
        });
  }
}

export default new App();
