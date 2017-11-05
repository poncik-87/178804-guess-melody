/**
 * Конвертер времени из числа секунд в объект с минутами/секундами
 */
const timeConverter = {
  /**
   * Функция конвертирует время в секундах в объект с минутами и секундами
   *
   * @param {number} timeInSeconds Время в секундах
   * @return {Object} Объект времени с минутами и секундами
   */
  numberToTime(timeInSeconds) {
    return {
      minutes: Math.floor(timeInSeconds / 60),
      seconds: timeInSeconds % 60
    };
  },
  /**
   * Функция конвертирует объект времени с минутами и секундами в секунды
   *
   * @param {Object} time Объект времени с минутами и секундами
   * @param {number} time.minutes Минуты
   * @param {number} time.seconds Секунды
   * @return {number} Время в секундах
   */
  timeToNumber(time) {
    return time.minutes * 60 + time.seconds;
  }
};

export default timeConverter;
