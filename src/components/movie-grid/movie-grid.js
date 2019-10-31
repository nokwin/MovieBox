import React from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import PropTypes from "prop-types";

import Pagination from "../pagination";
import './movie-grid.css'
import {getFilms} from "./movie-grid-actions";
import MovieCart from '../movie-card';
import Spinner from "../spinner";

class MovieGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page_size: 20,
            favFilms: null,
            loading: true,
            favoriteFilms: this.props.favoriteFilms,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.favoriteFilms !== nextProps.favoriteFilms) {
            return {
                favoriteFilms: nextProps.favoriteFilms
            }
        }
        return null;
    }

    componentDidMount() {
        if (this.props.favoriteFilms) {
            this.setState({
                favFilms: this.getFavorites(this.props.page || 1),
            });
        } else {
            this.props.getFilms(this.props.page).then(() => this.setState({
                    loading: false,
                })
            )

        }
    }

    getFavorites(pageNumber) {
        const {favoriteFilms} = this.state;
        const {page_size} = this.state;
        const filmsStartCount = pageNumber * page_size - page_size;
        const newFavoriteFilms = [];
        for (let i = filmsStartCount; i < filmsStartCount + 20; i++) {
            if (favoriteFilms[i]) {
                newFavoriteFilms.push(favoriteFilms[i])
            }
        }
        this.setState({
            loading: false,
        });
        return newFavoriteFilms
    }

    updateFavorites(pageNumber) {
        this.setState({
            favFilms: this.getFavorites(pageNumber)
        })
    }

    changePage = e => {
        let {selected} = e;
        selected++;
        if (selected) {
            this.props.history.push(`/page/${selected}`);
            this.props.getFilms(selected)
        }
    };
    changeFavoritePage = e => {
        let {selected} = e;
        selected++;
        if (selected) {
            this.props.history.push(`/favorites/${selected}`);
            this.updateFavorites(selected)
        }
    };

    displayFilms(films) {
        return films.map((movie) => {
            const {title, vote_average, poster_path, id, genres = [], release_date, genre_ids = 0} = movie;
            return <MovieCart
                title={title}
                rate={vote_average}
                poster={poster_path}
                id={id}
                type={genre_ids ||
                genres.map((genre) => genre.id)
                }
                year={release_date}
                key={id}/>
        })
    }

    render() {
        const {page_size, favFilms} = this.state;
        const {films} = this.props;
        if (this.state.loading) {
            return <Spinner/>
        }
        return (
            <div className='movie__grid'>
                <div className='container'>
                    <div className="row justify-content-start movie__block">
                        {
                            favFilms ? (
                                    this.displayFilms(favFilms)
                                ) :
                                (films &&
                                    this.displayFilms(films)
                                )
                        }
                    </div>
                    <div className="pagination d-flex justify-content-center">
                        {
                            favFilms && this.props.totalFavoriteFilms > 20 &&
                            <Pagination
                                initialPage={this.props.page}
                                pageCount={Math.ceil(this.props.totalFavoriteFilms / page_size)}
                                totalFilms={this.props.totalFavoriteFilms}
                                changePage={this.changeFavoritePage}
                            />
                        }
                        {
                            !favFilms && films &&
                            <Pagination
                                initialPage={this.props.page}
                                pageCount={this.props.total_pages}
                                totalFilms={this.props.total_pages}
                                changePage={this.changePage}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

/*MovieGrid.defaultProps = {
    page: 1,
}*/
MovieGrid.propTypes = {
    page: PropTypes.number,
};
const
    mapStateToProps = state => {
        return {
            genres: state.genres,
            totalFavoriteFilms: state.favorites.length,
            films: state.films.results,
            total_pages: state.films.total_pages
        }
    };

export default withRouter(connect(mapStateToProps, {getFilms})(MovieGrid));



