import { observable, decorate, action } from "mobx";

import instance from "../utils/axios-config";

class GenresStore {
  genres = null;

  loading = true;

  fetchGenres = async () => {
    try {
      const payload = await instance.get(`genre/movie/list`);
      this.genres = payload.data.genres;
      this.loading = false;
      return this.genres;
    } catch (e) {
      return e;
    }
  };
}

decorate(GenresStore, {
  genres: observable,
  loading: observable,
  fetchGenres: action.bound
});

export default GenresStore;
