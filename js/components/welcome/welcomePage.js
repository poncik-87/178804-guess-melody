import renderPage from '../../utils/renderPage';
import getRandomLevelPage from '../../utils/getRandomLevelPage';
import WelcomeView from './WelcomeView';

/**
 * Функция возвращает экран приветствия
 *
 * @return {HTMLElement}
 */
const welcomePage = () => {
  const view = new WelcomeView();
  let gamerAnswers = [];
  view.onStartClick = () => {
    const initialGameState = {
      time: 10,
      lives: 3
    };

    renderPage(getRandomLevelPage(gamerAnswers, initialGameState));
  };

  return view.element;
};

export default welcomePage;
