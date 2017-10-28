/**
 * Фунция повторяет переданную функцию заданное количество раз
 *
 * @param {number} repeatCount Количество повторений
 * @param {Function} callback Функция, которую нужно вызвать
 */
export default function repeatTimes(repeatCount, callback) {
  for (let i = 0; i < repeatCount; i++) {
    callback();
  }
}
