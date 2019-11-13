import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import "./movie-card.css";
import MovieCardImage from "./movie-card-image";
import GenresStore from "../../store/mobx-store-genres";

const MovieCard = ({ poster, id, title, rate, type, year }) => {
  const movieYear = moment(year, "YYYY/MM/DD").year();
  const genres = GenresStore.getGenres();

  const movieGenres = genres.filter(item => type.includes(item.id));
  const genresNames = movieGenres.map(item => item.name);
  const genresString = genresNames.join(", ");

  return (
    <div className=" col-6 col-lg-3 d-flex flex-column justify-content-end align-items-center">
      <MovieCardImage path={poster} year={movieYear} id={id} />
      <div className="movie__desc d-flex align-items-center justify-content-around">
        <div className="movie__about">
          <h2 className="movie__name">{title}</h2>
          <span className="movie__type" />
          {genresString}
        </div>
        <div className="movie__rate">{rate}</div>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  poster: PropTypes.string,
  type: PropTypes.arrayOf(PropTypes.number).isRequired
};
MovieCard.defaultProps = {
  poster: null
};

export default MovieCard;
