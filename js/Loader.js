const SERVER_URL = `https://es.dump.academy/guess-melody`;

class Loader {
  load(url) {
    return fetch(`${SERVER_URL}/${url}`).then((response) => response.json());
  }
}

export default new Loader();
