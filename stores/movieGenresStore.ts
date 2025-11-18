import { getMovieGenres } from '@/hooks/useMovie';
import { makeAutoObservable } from 'mobx';

class MovieGenresStore {
    movieGenres = new Map<number, string>();

    constructor() {
        makeAutoObservable(this);
        this.loadMovieGenres();
    }

    async loadMovieGenres() {
        const genres = await getMovieGenres();
        
        genres.genres.forEach(genre => {
            this.movieGenres.set(genre.id, genre.name);
        });
    }

    getGenreName(id: number) {
        return this.movieGenres.get(id);
    }

}

export const movieGenresStore = new MovieGenresStore();
