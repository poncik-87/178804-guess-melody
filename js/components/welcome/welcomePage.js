import GameState from '../../data/GameState';
import WelcomeView from './WelcomeView';
import routeToNextPage from "../../utils/routeToNextPage";

/**
 * Функция возвращает экран приветствия
 *
 * @return {HTMLElement}
 */
const welcomePage = () => {
  const view = new WelcomeView();
  view.onStartClick = () => {
    routeToNextPage(GameState.generate());
  };

  return view.element;
};

export default welcomePage;
