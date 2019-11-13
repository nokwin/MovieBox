import { observable, decorate, action, toJS } from "mobx";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";

class FilmsStore {
  films = null;

  results = null;

  loading = true;

  fetchFilms = async page => {
    try {
      const films = await instance.get(`movie/now_playing?page=${page}`);
      films.data.results = camelcaseKeys(films.data.results);
      this.films = films.data;
      this.results = films.data.results;
      this.loading = false;
      return toJS(this.films);
    } catch (e) {
      return e;
    }
  };

  getFilms = () => {
    return toJS(this.results);
  };
}

decorate(FilmsStore, {
  films: observable,
  loading: observable,
  fetchFilms: action.bound
});
const filmsStore = new FilmsStore();
export default filmsStore;
