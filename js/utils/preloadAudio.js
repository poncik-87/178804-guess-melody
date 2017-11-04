
/**
 * Функция загружает аудио файлы песен для сохранения в кэше браузера
 *
 * @param {Array<string>} srcList Список url адресов песен
 * @return {Promise} Промис предварительной загрузки
 */
export default function preloadAudio(srcList) {
  const loadPromises = srcList.map((src) =>
    new Promise((resolve) => {
      const audio = new Audio();
      audio.addEventListener(`canplaythrough`, resolve, false);
      audio.addEventListener(`suspend`, resolve, false);

      audio.src = src;
      audio.load();
    }));

  return Promise.all(loadPromises);
}
