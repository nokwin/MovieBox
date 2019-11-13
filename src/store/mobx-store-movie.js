import { observable, decorate, action, toJS } from "mobx";
import camelcaseKeys from "camelcase-keys";
import instance from "../utils/axios-config";

class MovieStore {
  movie = null;

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
}

decorate(MovieStore, {
  movie: observable,
  loading: observable,
  fetchMovie: action.bound
});
const movieStore = new MovieStore();
export default movieStore;
