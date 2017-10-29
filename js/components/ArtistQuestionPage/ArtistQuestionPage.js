import {Answer} from '../../consts';

import App from '../../App';
import AudioControl from '../AudioControl/AudioControl';
import GameStatus from '../GameStatus/GameStatus';
import ArtistQuestionPageView from './ArtistQuestionPageView';
import renderPage from '../../utils/renderPage';

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
   * @param {number} gameState.lives Количество жизней игрока
   * @param {number} gameState.time Оставшееся время игры
   * @param {Object} gameState.currentQuestion Текущий вопрос игры
   * @param {Array<Object>} gameState.currentQuestion.answers Ответы на текущий вопрос
   * @param {number} gameState.currentQuestion.writeAnswerId Идентификатор правильного ответа на текущий вопрос
   */
  init(gameState) {
    this._gameState = gameState;

    this._gameStatus = new GameStatus({
      lives: this._gameState.lives,
      time: this._gameState.time
    });
    const writeAnswer = gameState.currentQuestion.answers[this._gameState.currentQuestion.writeAnswerId];
    const audioControl = new AudioControl(writeAnswer.src);

    this._view.init(this._gameState.currentQuestion, {
      renderGameStatusView: this._gameStatus.renderGameStatusView,
      renderAudioControlView: audioControl.renderAudioControlView
    });

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
    App.showNextPage(this._gameState);
  }
}

export default new ArtistQuestionPage();
