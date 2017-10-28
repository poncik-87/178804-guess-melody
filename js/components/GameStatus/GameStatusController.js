import GameStatusView from './GameStatusView';

/**
 * Класс контроллера для компонента статуса игры
 */
export default class GameStatusController {
  /**
   * @param {number} lives Количество жизней игрока
   * @param {number} time Оставшееся время игры
   */
  constructor({lives, time}) {
    this._view = new GameStatusView({lives, time});

    this.renderGameStatusView = this.renderGameStatusView.bind(this);
  }

  renderGameStatusView() {
    return this._view.element;
  }

  update({lives, time}) {
    this._view.update({lives, time});
  }
}
