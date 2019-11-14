import { observable, decorate, action, toJS } from "mobx";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";

class MovieStore {
  movie = null;

  favorites = [];

  loading = true;

  fetchMovie = async id => {
    try {
      const movie = await instance.get(`movie/${id}`);
      this.movie = camelcaseKeys(movie.data);
      this.loading = false;
      return toJS(this.movie);
    } catch (e) {
      return e;
    }
  };

  isFavorite = id => this.favorites.some(item => item.id === id);

  addFavorite = movie => {
    this.favorites.unshift(movie);
  };

  removeFavorite = id => {
    this.favorites = this.favorites.filter(item => item.id !== id);
  };
}

decorate(MovieStore, {
  movie: observable,
  favorites: observable,
  loading: observable,
  fetchMovie: action,
  addFavorite: action,
  removeFavorite: action
});
const movieStore = new MovieStore();
export default movieStore;
