import GameState from '../../data/GameState';
import GameData from '../../data/GameData';
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
    routeToNextPage(new GameState(), GameData.generate());
  };

  return view.element;
};

export default welcomePage;
