
    export const getFilms = async (page, url = `https://api.themoviedb.org/3/movie/now_playing?&language=en-US&api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`) => {
        const fullUrl = `${url}&page=${page}`
        const res = await fetch(fullUrl);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };
    export const getFilm = async (id) => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };
    export const getGenres = async (url = "https://api.themoviedb.org/3/genre/movie/list?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US") => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    };




