import {Answer, TICK_TIME, FAST_ANSWER_TIMEOUT} from '../../consts';

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
    this._isFastAnswer = true;

    const gameStatus = new GameStatus(gameState);
    let renderAudioControlViewsList = [];
    this._audioControlsList = [];
    this._gameState.currentQuestion.answers.forEach(({src}) => {
      const audioControl = new AudioControl({src, isAutoplay: false});
      this._audioControlsList.push(audioControl);
      renderAudioControlViewsList.push(audioControl.renderView);

      audioControl.onPlayClicked = () => {
        this._audioControlClicked(audioControl);
      };
    });

    gameStatus.init({
      faults: this._gameState.faults,
      time: this._gameState.time
    });
    this._view.init(this._gameState.currentQuestion, {
      renderGameStatusView: gameStatus.renderView,
      renderAudioControlViewsList});

    renderPage(this._view.element);

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
    App.showNextPage(this._gameState);
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
   * @param {Array<string>} checkedAnswerGenres Признак правильности ответа
   * @private
   */
  _onAnswerClick(checkedAnswerGenres) {
    const isCorrectAnswer = !checkedAnswerGenres.some((genre) => genre !== this._gameState.currentQuestion.genre);

    if (isCorrectAnswer) {
      this._gameState = this._gameState.setQuestionAnswer(this._isFastAnswer ? Answer.FAST_CORRECT : Answer.CORRECT);
    } else {
      this._gameState = this._gameState.setQuestionAnswer(Answer.INCORRECT).increaseFault();
    }

    this._showNextPage();
  }

  /**
   * Обработчик нажатия кнопки воспроизведения песни
   *
   * @param {AudioControl} currentAudioControl Аудио контрол на котором произошло событие
   * @private
   */
  _audioControlClicked(currentAudioControl) {
    if (!currentAudioControl.isPlaying) {
      // нужно остановить воспроизведение предыдущей песни
      this._audioControlsList.forEach((audioControl) => {
        if (audioControl.isPlaying) {
          audioControl.pause();
        }
      });

      currentAudioControl.play();
    } else {
      currentAudioControl.pause();
    }
  }
}

export default new GenreQuestionPage();
