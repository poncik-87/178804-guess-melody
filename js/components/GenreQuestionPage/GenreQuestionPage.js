import {Answer} from '../../consts';

import routeToNextPage from '../../utils/routeToNextPage';
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
   * @param {number} gameState.lives Количество жизней игрока
   * @param {number} gameState.time Оставшееся время игры
   * @param {Object} gameState.currentQuestion Текущий вопрос игры
   * @param {Array<Object>} gameState.currentQuestion.answers Ответы на текущий вопрос
   */
  init(gameState) {
    this._gameState = gameState;

    this._gameStatus = new GameStatus({
      lives: this._gameState.lives,
      time: this._gameState.time
    });
    const renderAudioControlViewList = this._gameState.currentQuestion.answers.map(({src}) =>
      (new AudioControl(src)).renderAudioControlView);

    this._view.init(this._gameState.currentQuestion, {
      renderGameStatusView: this._gameStatus.renderGameStatusView,
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
      routeToNextPage(this._gameState);
    }

    this._gameStatus.update({
      lives: this._gameState.lives,
      time: this._gameState.time
    });
  }

  /**
   * Обработчик нажатия кнопки перехода к следующему экрану
   *
   * @param {boolean} isCorrectAnswer Признак правильности ответа
   * @private
   */
  _onAnswerClick(isCorrectAnswer) {
    if (isCorrectAnswer) {
      this._gameState = this._gameState.setQuestionAnswer(Answer.CORRECT);
    } else {
      this._gameState = this._gameState.setQuestionAnswer(Answer.INCORRECT).dropLive();
    }

    clearInterval(this._timerId);
    routeToNextPage(this._gameState);
  }
}

export default new GenreQuestionPage();
