import { MovieDetail, MovieGenresResponse, MovieReviewsResponse, PagedMovieList } from '@/interfaces/interfaces';
import { tmdbRequest } from "../utils/request";

const commonSearchParams = {
  include_adult: false,
  include_video: false,
  language: 'zh',
  sort_by: 'popularity.desc',
} as const;

interface ExtraQuery {
  with_keywords?: string,
  page?: number
}


// export const searchMovie = async (extraQuery: ExtraQuery): Promise<PagedMovieList> => {
//     const response = await tmdbRequest.get(`/discover/movie`, { params: {...commonSearchParams, ...extraQuery}});
//     return response;
// };

// export const searchMovieByKeywords = async (keywords: string): Promise<PagedMovieList> => {
//     return searchMovie({with_keywords : keywords, page: 1});
// };

export const getTopMovies = async (page: number = 1): Promise<PagedMovieList> => {
  const response = await tmdbRequest.get(`/discover/movie`, { params: { ...commonSearchParams, page: page } });
  return response;
};

export const searchMovie = async (query: string): Promise<PagedMovieList> => {
  const params = {
    query: encodeURIComponent(query),
    sort_by: 'popularity.desc',
    language: 'zh',
  };
  const response = await tmdbRequest.get(`search/movie`, { params });
  return response;
};

export const getMovieGenres = async (): Promise<MovieGenresResponse> => {
  const params = {
    language: 'zh'
  };
  const response = await tmdbRequest.get(`/genre/movie/list`, { params });
  return response;
};

export const fetchMovieDetail = async (id: number): Promise<MovieDetail> => {
  const response = await tmdbRequest.get(`/movie/${id}`);
  return response;
};

export const fetchMovieReviews = async (id: number, page: number=1): Promise<MovieReviewsResponse> => {
  const params = {
    language: 'en-US',
    page: page
  };
  const response = await tmdbRequest.get(`/movie/${id}/reviews`, { params });
  return response;
};  