import {Answer, TICK_TIME, FAST_ANSWER_TIMEOUT} from '../../consts';

import app from '../../app';
import AudioControl from '../AudioControl/audio-control';
import GameStatus from '../GameStatus/game-status';
import ArtistQuestionPageView from './artist-question-page-view';
import renderMainView from '../../utils/render-main-view';

/**
 * Страница вопроса автора песни
 */
class ArtistQuestionPage {
  constructor() {
    this._view = new ArtistQuestionPageView();
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
    this._isFastAnswer = true;

    if (this._audioControl) {
      this._audioControl.remove();
    }

    this._audioControl = new AudioControl({
      src: gameState.currentQuestion.src,
      isAutoplay: true});

    const gameStatus = new GameStatus(gameState);
    gameStatus.init({
      faults: this._gameState.faults,
      time: this._gameState.time
    });
    this._view.init(this._gameState.currentQuestion, {
      gameStatusView: gameStatus.view,
      audioControlView: this._audioControl.view
    });

    renderMainView(this._view);

    this._timerId = setInterval(this._onTimerTick.bind(this), TICK_TIME);
    this._fastAnswerTimer = setTimeout(this._onFastAnswerTimerTimeout.bind(this), FAST_ANSWER_TIMEOUT);
    this._view.onAnswerClick = this._onAnswerClick.bind(this);
  }

  /**
   * Показать следующую страницу
   *
   * @private
   */
  _showNextPage() {
    clearInterval(this._timerId);
    clearTimeout(this._fastAnswerTimer);
    app.showNextPage(this._gameState);
  }

  /**
   * Обработчик таймера времени игры
   *
   * @private
   */
  _onTimerTick() {
    this._gameState = this._gameState.tickTime();

    if (this._gameState.time <= 0) {
      this._showNextPage();
    }
  }

  /**
   * Обработчик таймера быстрого ответа
   * @private
   */
  _onFastAnswerTimerTimeout() {
    this._isFastAnswer = false;
  }

  /**
   * Обработчик нажатия кнопки перехода к следующему экрану
   *
   * @param {string} answerId Идентификатор ответа
   * @private
   */
  _onAnswerClick(answerId) {
    const answer = this._gameState.currentQuestion.answers.find(({id}) => id === answerId);
    if (answer && answer.isCorrect) {
      this._gameState = this._gameState.setQuestionAnswer(this._isFastAnswer ? Answer.FAST_CORRECT : Answer.CORRECT);
    } else {
      this._gameState = this._gameState.setQuestionAnswer(Answer.INCORRECT).increaseFault();
    }

    this._showNextPage();
  }
}

export default new ArtistQuestionPage();
