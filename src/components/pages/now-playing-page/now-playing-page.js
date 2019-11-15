import React from "react";
import PropTypes from "prop-types";

import "./now-playing-page.css";
import ReactRouterPropTypes from "react-router-prop-types";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import MovieGrid from "../../movie-grid/movie-grid";
import Spinner from "../../spinner";
import Pagination from "../../pagination";
import AppHeader from "../../app-header";

@inject("filmsStore")
@observer
class NowPlayingPage extends React.Component {
  componentDidMount() {
    const { match, filmsStore } = this.props;
    const { page } = match.params;
    filmsStore.fetchFilms(page);
  }

  changePage = e => {
    const { history, filmsStore } = this.props;
    const { selected } = e;
    const page = selected + 1;
    history.push(`/page/${page}`);
    filmsStore.fetchFilms(page);
  };

  render() {
    const { match, filmsStore } = this.props;
    const { loading, films } = filmsStore;
    const { page } = match.params;
    if (loading) {
      return <Spinner />;
    }
    return (
      <>
        <AppHeader />
        <MovieGrid films={toJS(films.results)} />
        <Pagination
          initialPage={Number(page) || 1}
          pageCount={toJS(films.total_pages)}
          changePage={this.changePage}
        />
      </>
    );
  }
}

NowPlayingPage.wrappedComponent.propTypes = {
  filmsStore: PropTypes.shape({
    films: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    fetchFilms: PropTypes.func.isRequired
  }).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired
};

export default NowPlayingPage;
