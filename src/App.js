import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { observer } from "mobx-react";

import "./App.css";
import AppFooter from "./components/app-footer";
import NowPlayingPage from "./components/pages/now-playing-page";
import MoviePage from "./components/pages/movie-page";
import FavoriteMoviePage from "./components/pages/favorite-movie-page";
import Page404 from "./components/pages/page-404";
import genresStore from "./store/mobx-store-genres";
import Spinner from "./components/spinner";

@observer
class App extends React.Component {
  componentDidMount() {
    genresStore.fetchGenres();
  }

  render() {
    const { loading } = genresStore;
    if (loading) {
      return <Spinner />;
    }
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" component={NowPlayingPage} />
            <Route path="/page/:page" component={NowPlayingPage} />
            <Route path="/movie/:id" component={MoviePage} />
            <Route path="/favorites/:page?" component={FavoriteMoviePage} />
            <Route component={Page404} />
          </Switch>
        </div>
        <AppFooter />
      </Router>
    );
  }
}

export default App;
