import {Answer} from '../../consts';

import App from '../../App';
import GameStatus from '../GameStatus/GameStatus';
import AudioControl from '../AudioControl/AudioControl';
import GenreQuestionPageView from './GenreQuestionPageView';
import renderPage from '../../utils/renderPage';

/**
 * Страница вопроса жанра песни
 */
class GenreQuestionPage {
  constructor() {
    this._view = new GenreQuestionPageView();
  }

  /**
   * Функция инициализации страницы
   *
   * @param {GameState} gameState Состояния игры
   * @param {number} gameState.faults Количество ошибок игрока
   * @param {number} gameState.time Оставшееся время игры
   * @param {Object} gameState.currentQuestion Текущий вопрос игры
   * @param {Array<Object>} gameState.currentQuestion.answers Ответы на текущий вопрос
   */
  init(gameState) {
    this._gameState = gameState;

    const gameStatus = new GameStatus(gameState);
    const renderAudioControlViewList = this._gameState.currentQuestion.answers.map(({src}) =>
      (new AudioControl(src)).renderView);

    gameStatus.init({
      faults: this._gameState.faults,
      time: this._gameState.time
    });
    this._view.init(this._gameState.currentQuestion, {
      renderGameStatusView: gameStatus.renderView,
      renderAudioControlViewList});

    renderPage(this._view.element);

    this._timerId = setInterval(this._onTimerTick.bind(this), 1000);
    this._view.onAnswerClick = this._onAnswerClick.bind(this);
  }

  /**
   * Обработчик таймера времени игры
   *
   * @private
   */
  _onTimerTick() {
    this._gameState = this._gameState.tickTime();

    if (this._gameState.time <= 0) {
      clearInterval(this._timerId);
      App.showNextPage(this._gameState);
    }
  }

  /**
   * Обработчик нажатия кнопки перехода к следующему экрану
   *
   * @param {Array<string>} checkedAnswerGenres Признак правильности ответа
   * @private
   */
  _onAnswerClick(checkedAnswerGenres) {
    const isCorrectAnswer = !checkedAnswerGenres.some((genre) => genre !== this._gameState.currentQuestion.genre);

    if (isCorrectAnswer) {
      this._gameState = this._gameState.setQuestionAnswer(Answer.CORRECT);
    } else {
      this._gameState = this._gameState.setQuestionAnswer(Answer.INCORRECT).increaseFault();
    }

    clearInterval(this._timerId);
    App.showNextPage(this._gameState);
  }
}

export default new GenreQuestionPage();
