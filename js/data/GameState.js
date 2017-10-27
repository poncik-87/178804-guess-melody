import timeConverter from '../utils/timeConverter';

const initState = {
  lives: 3,
  time: timeConverter.timeToNumber({
    minutes: 5,
    seconds: 0
  })
};

/**
 * Класс состояния игры
 * Позволяет иммутабельно уменьшать время, количество жизней, а также сбрасывать состояние
 */
export default class GameState {
  constructor(lives = initState.lives, time = initState.time) {
    this._lives = lives;
    this._time = time;
  }

  /**
   * Количество жизней игрока
   *
   * @return {number} Количество жизней игрока
   */
  get lives() {
    return this._lives;
  }

  /**
   * Текущее время игры
   *
   * @return {number} Время игры
   */
  get time() {
    return this._time;
  }

  /**
   * Уменьшает количество жизней игрока на 1
   *
   * @return {GameState} Новое состояние игры
   */
  dropLive() {
    return new GameState(this.lives - 1, this.time);
  }

  /**
   * Уменьшает время игры на 1 секунду
   *
   * @return {GameState} Новое состояние игры
   */
  tickTime() {
    return new GameState(this.lives, this.time - 1);
  }
}
