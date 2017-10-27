import GameStatusView from './GameStatusView';

/**
 * Класс контроллера для компонента статуса игры
 */
export default class GameStatusController {
  /**
   * @param {GameState} gameState Состояние игры
   */
  constructor(gameState) {
    this._view = new GameStatusView(gameState);

    this.renderGameStatusView = () => {
      return this._view.element;
    };
  }

  update(gameState) {
    this._view.update(gameState);
  }
}
