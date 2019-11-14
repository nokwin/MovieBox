import { observable, decorate, action, toJS } from "mobx";

import instance from "../utils/axios-config";

class GenresStore {
  genres = null;

  loading = true;

  fetchGenres = async () => {
    try {
      const payload = await instance.get(`genre/movie/list`);
      this.genres = payload.data.genres;
      this.loading = false;
      return toJS(this.genres);
    } catch (e) {
      return e;
    }
  };

  getGenres = () => {
    return toJS(this.genres);
  };
}

decorate(GenresStore, {
  genres: observable,
  loading: observable,
  fetchGenres: action.bound,
  getGenres: action
});
const genresStore = new GenresStore();
export default genresStore;
