import getElementFromTemplate from './utils/getElementFromTemplate';

export default class AbstractView {
  /**
   * Функция возвращает шаблон строки элемента
   * (должна быть переопределена в наследниках, обязательно)
   */
  get template() {
    throw new Error(`Should define template function for view`);
  }

  /**
   * Функция отрисовывает dom элемент для строки template
   *
   * @return {HTMLElement} Dom элемент
   */
  render() {
    return getElementFromTemplate(this.template);
  }

  /**
   * Функция обновляет отображение вью
   */
  update() {
    const newElement = this.render();
    this.element.parentNode.replaceChild(newElement, this.element);
    this._element = newElement;
    this.bind();
  }

  /**
   * Функция вставляет в dom элемента дочерние элементы
   * (может быть переопределена в наследниках, опционально)
   */
  insertChildren() {
  }

  /**
   * Функция навешивает обработчики на элемент
   * (может быть переопределена в наследниках, опционально)
   */
  bind() {
  }

  /**
   * Функция отложенно создает dom элемент и возвращает его
   *
   * @return {HTMLElement} Dom элемент
   */
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.insertChildren();
      this.bind();
    }

    return this._element;
  }
}
