import Constants from "../utils/constants";

const { FILMS_REQUEST, FILMS_SUCCESS, FILMS_FAILURE, FILMS_FETCH } = Constants;

export const fetchFilmsRequest = () => ({
  type: FILMS_REQUEST
});
export const fetchFilmsSuccess = films => ({
  type: FILMS_SUCCESS,
  payload: films
});
export const fetchFilmsFailure = err => ({
  type: FILMS_FAILURE,
  payload: err
});
export const fetchFilms = page => ({
  type: FILMS_FETCH,
  payload: page
});
