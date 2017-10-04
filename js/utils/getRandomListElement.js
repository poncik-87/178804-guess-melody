/**
 * Возвращает случайный элемент из списка
 *
 * @param {Array} list Список элементов
 * @return {ArrayElement} Случайный элемент списка
 */
export default function (list) {
  return list[Math.floor(Math.random() * list.length)];
}
