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

  getMovie = () => {
    return toJS(this.movie);
  };

  getFavorites = () => {
    return toJS(this.favorites);
  };

  addFavorite = movie => {
    console.log("movie", movie);
    console.log("favorites", this.getFavorites());
    this.favorites.unshift(movie);
    console.log("favorites", this.getFavorites());
  };

  removeFavorite = id => {
    this.favorites.filter(item => item.id !== id);
  };
}

decorate(MovieStore, {
  movie: observable,
  favorites: observable,
  loading: observable,
  fetchMovie: action,
  getMovie: action,
  getFavorites: action,
  addFavorite: action,
  removeFavorite: action
});
const movieStore = new MovieStore();
export default movieStore;
