import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { observable, decorate, action, toJS } from "mobx";

import "./movie-grid.css";
import MovieCard from "../movie-card";
import GenresStore from "../../store/mobx-store-genres";

@observer
class MovieGrid extends React.Component {
  displayFilms = movie => {
    const {
      title,
      voteAverage,
      posterPath,
      id,
      releaseDate,
      genreIds = 0
    } = movie;
    const { genres } = GenresStore;
    console.log("FEFE", toJS(genres));
    return (
      <MovieCard
        title={title}
        rate={voteAverage}
        poster={posterPath}
        id={id}
        type={genreIds || genres.map(genre => genre.id)}
        year={releaseDate}
        key={id}
      />
    );
  };

  render() {
    const { films } = this.props;
    return (
      <div className="movie__grid">
        <div className="container">
          <div className="row justify-content-start movie__block">
            {films && films.map(this.displayFilms)}
          </div>
        </div>
      </div>
    );
  }
}

MovieGrid.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired
    })
  )
};
MovieGrid.defaultProps = {
  films: []
};

export default withRouter(MovieGrid);
