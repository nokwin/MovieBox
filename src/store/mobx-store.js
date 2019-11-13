import { observable, decorate, action } from "mobx";
import instance from "../utils/axios-config";

class MobxStore {
  genres = [];

  getGenres = async () => {
    try {
      const genres = await instance.get(`genre/movie/list`);
      this.genres = genres;
      return genres;
    } catch (e) {
      return e;
    }
  };
}

decorate(MobxStore, {
  genres: observable,
  getGenres: action
});

export default MobxStore;
