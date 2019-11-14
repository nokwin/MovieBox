import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { toJS } from "mobx";
import "./favorite-movie-page.css";
import MovieGrid from "../../movie-grid";
import AppHeader from "../../app-header";
import movieStore from "../../../store/mobx-store-movie";

class FavoriteMoviePage extends React.Component {
  changeFavoritePage = e => {
    const { history } = this.props;
    const { selected } = e;
    const page = selected + 1;
    history.push(`/favorites/${page}`);
  };

  render() {
    const films = toJS(movieStore.favorites);
    return (
      <>
        <AppHeader />
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="favorite__page__header">favorite page</h2>
        </div>
        {films && films.length !== 0 ? (
          <>
            <MovieGrid films={films} />
          </>
        ) : (
          <div className="d-flex justify-content-center">
            <h2>Favorite movie not found</h2>
          </div>
        )}
      </>
    );
  }
}

FavoriteMoviePage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

export default FavoriteMoviePage;
