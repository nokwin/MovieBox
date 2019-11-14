import React from "react";

import "./now-playing-page.css";
import ReactRouterPropTypes from "react-router-prop-types";
import { observer } from "mobx-react";
import { toJS } from "mobx";
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

NowPlayingPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired
};

export default NowPlayingPage;
