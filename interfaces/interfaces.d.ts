export interface Movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}


export interface ProductCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductCompany[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PagedMovieList {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}
export interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

export type MovieList = Movie[];

interface MovieGenresResponse {
    genres: MovieGenre[];
}

export interface MovieGenre {
    id: number;
    name: string;
}

export type MovieGenres = MovieGenre[];

export interface Review {
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path: string | null;
      rating: number;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}

export type MovieReviews = Review[];

export interface MovieReviewsResponse {
    id: number;
    page: number;
    results: MovieReviews;
    total_pages: number;
    total_results: number;
}

export interface MovieCardProps {
    id: number | string;
    poster_path: string | null;
    release_date: string,
    vote_average: number,
    title: string,
    isVertical: boolean
}