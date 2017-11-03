const SERVER_URL = `https://es.dump.academy/guess-melody`;

class Loader {
  /**
   * Загрузка данных с сервера
   *
   * @param {string} url Путь к ресурсу
   * @return {Promise} Промис результата загрузки
   */
  load(url) {
    return fetch(`${SERVER_URL}/${url}`).then((response) => response.json());
  }

  /**
   * Сохранение данных на сервер
   *
   * @param {Array<Object>} data Сохраняемые данные
   * @param {number} url Путь к ресурсу
   * @return {Promise} Промис результата сохранения
   */
  save(data, url) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(`${SERVER_URL}/${url}`, requestSettings);
  }
}

export default new Loader();
