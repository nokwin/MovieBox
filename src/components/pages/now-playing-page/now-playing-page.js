import React from "react";

import "./now-playing-page.css";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { observer } from "mobx-react";
import filmsStore from "../../../store/mobx-store-films";

import MovieGrid from "../../movie-grid/movie-grid";
import Spinner from "../../spinner";
import Pagination from "../../pagination";
import AppHeader from "../../app-header";

@observer
class NowPlayingPage extends React.Component {
  componentDidMount() {
    const { match } = this.props;
    const { page } = match.params;
    filmsStore.fetchFilms(page);
  }

  changePage = e => {
    const { history } = this.props;
    const { selected } = e;
    const page = selected + 1;
    history.push(`/page/${page}`);
    filmsStore.fetchFilms(page);
  };

  render() {
    const { match } = this.props;
    const { loading } = filmsStore;
    const { page } = match.params;
    if (loading) {
      return <Spinner />;
    }
    return (
      <>
        <AppHeader />
        <MovieGrid films={filmsStore.getFilms()} />
        <Pagination
          initialPage={Number(page) || 1}
          changePage={this.changePage}
        />
      </>
    );
  }
}

NowPlayingPage.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired
    })
  ),
  pages: PropTypes.number,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired
};
NowPlayingPage.defaultProps = {
  pages: 1,
  films: []
};

export default NowPlayingPage;
