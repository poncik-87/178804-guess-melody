/**
 * Функция преобразовывает данные из формата сервера в формат приложения
 *
 * @param {Array<Object>} serverData Данные в формате сервера
 * @return {Array<Object>} Данные в формате приложения
 */
export default function adaptServerData(serverData) {
  return serverData.map((dataItem) => {
    const appDataItem = Object.assign({}, dataItem);
    appDataItem.answers = appDataItem.answers.map((answer, idx) =>
      Object.assign({}, answer, {id: idx.toString()}));
    return appDataItem;
  });
}
