import getElementFromTemplate from './getElementFromTemplate';

/**
 * Функция загружает аудио файлы песен для сохранения в кэше браузера
 *
 * @param {Array<string>} srcList Список url адресов песен
 * @return {Promise} Промис предварительной загрузки
 */
export default function preloadAudio(srcList) {
  const loadPromises = srcList.map((src) =>
    new Promise((resolve) => {
      const audioNode = getElementFromTemplate(
          `<audio src="${src}"></audio>`
      );

      audioNode.addEventListener(`canplaythrough`, resolve, false);
      audioNode.addEventListener(`suspend`, resolve, false);
    }));

  return Promise.all(loadPromises);
}
