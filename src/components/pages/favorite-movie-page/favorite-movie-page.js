import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";

import "./favorite-movie-page.css";
import MovieGrid from "../../movie-grid";
import Pagination from "../../pagination";
import AppHeader from "../../app-header";
import movieStore from "../../../store/mobx-store-movie";
class FavoriteMoviePage extends React.Component {
  /*  getFav(pageNumber) {
    const  favorites=movieStore.getFavorites();
    const pageSize = 20;
    const filmsStartCount = pageNumber * pageSize - pageSize;
    const newFavoriteFilms = [];
    for (let i = filmsStartCount; i < filmsStartCount + pageSize; i + 1) {
      if (favorites[i]) {
        newFavoriteFilms.push(favorites[i]);
      }
    }
    return newFavoriteFilms;
  }*/

  changeFavoritePage = e => {
    const { history } = this.props;
    const { selected } = e;
    const page = selected + 1;
    history.push(`/favorites/${page}`);
  };

  render() {
    const favorites = movieStore.getFavorites();
    const { match } = this.props;
    const { page } = match.params;
    const films = movieStore.getFavorites();
    return (
      <>
        <AppHeader />
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="favorite__page__header">favorite page</h2>
        </div>
        {films && films.length !== 0 ? (
          <>
            <MovieGrid films={films} />

            {favorites.length > 20 && (
              <Pagination
                initialPage={page}
                pageCount={Math.ceil(favorites.length / 20)}
                changePage={this.changeFavoritePage}
              />
            )}
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
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired
};

export default FavoriteMoviePage;
